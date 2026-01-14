import { ApartmentDocument } from '../types/models.types';

type FeatureExtractionPipeline = any;
type Ollama = any;

export class EmbeddingController {
  private static pipe: FeatureExtractionPipeline | null = null;
  private static llm: Ollama | null = null;
  private static transformersModule: any = null;
  private static ollamaModule: any = null;

  private async getLLM() {
    if (!EmbeddingController.llm) {
      if (!EmbeddingController.ollamaModule) {
        console.log("Loading Ollama module...");
        EmbeddingController.ollamaModule = await import("@langchain/ollama");
      }
      console.log("Initializing Ollama LLM...");
      EmbeddingController.llm = new EmbeddingController.ollamaModule.Ollama({ model: "gemma2" });
    }
    return EmbeddingController.llm;
  }

  private async getPipeline() {
    if (!EmbeddingController.pipe) {
      if (!EmbeddingController.transformersModule) {
        console.log("Loading transformers module...");
        EmbeddingController.transformersModule = await import('@xenova/transformers');
      }
      console.log("Loading embedding model (Xenova/multilingual-e5-base)...");
      EmbeddingController.pipe = await EmbeddingController.transformersModule.pipeline('feature-extraction', 'Xenova/multilingual-e5-base', {
        quantized: true,
      });
    }
    return EmbeddingController.pipe;
  }

  public async extractFilters(query: string) {
    try {
      const input_prompt = `
      ### System:
      You are a friendly, witty, and helpful real estate AI assistant (speaking Hebrew).
      Your goal is to classify the user's intent and respond accordingly using JSON ONLY.
      You speak in Hebrew, speak in male language form, and once a user asks you for unrelated queries you answer that you are not able to assist with that and only with real estate queries.

      ### Personality & Tone:
      - Be warm and conversational (like a friendly agent on WhatsApp).
      - Use emojis occasionally.
      - NEVER sound robotic.
      - If the user chats, reply directly to their content with empathy or humor.

      ### Instructions:
      1. Analyze the input.
      2. Determine intent: "search" (finding a property) or "chat" (general conversation).
      3. Extract filters if searching.
      4. Output STRICT JSON.

      ### Output Rules (CRITICAL):
      - **OUTPUT ONLY RAW JSON.**
      - **DO NOT** use Markdown code blocks (like \`\`\`json).
      - **DO NOT** add any introductory text or explanations.
      - **DO NOT** say "Here is the result".

      ### JSON Structure:
      {
      "is_search": boolean,
      "filters": {
          "city": string | null,
          "max_price": number | null,
          "min_price": number | null,
      } | null,
      "reply": string
      }

      ### Examples:
      User: "היי, אני רוצה להתחיל לחפש"
      Result: { "is_search": false, "filters": null, "reply": "היי! בשמחה רבה 😄 הגעת למקום הנכון. איפה בא לך לגור?" }

      User: "וואי המחירים בתל אביב פשוט מטורפים"
      Result: { "is_search": false, "filters": null, "reply": "לגמרי... השוק שם רותח 🔥 אבל אל דאגה, אנחנו נמצא משהו שווה. יש לך תקציב מסוים?" }

      User: "מחפש דירה בנתניה עד 2.5 מיליון"
      Result: { "is_search": true, "filters": { "city": "נתניה", "max_price": 2500000, "min_price": null }, "reply": "נתניה על המפה! 🌊 בודק לך דירות בנתניה עד 2.5 מיליון עכשיו..." }

      ### Current Input:
      User: "${query}"
      Result:
      `
      const llm = await this.getLLM();
      const response = await llm.invoke(input_prompt)
      const start = response.indexOf('{');
      const end = response.lastIndexOf('}') + 1;
      const jsonStr = response.substring(start, end);
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Error extracting filters:", error);
      throw error;
    }
  }

  public buildSearchableText(doc: ApartmentDocument): string {
    const prefix = "passage:";
    const type = doc.type || "נכס";
    const city = doc.city || "";
    const street = doc.street || "";
    let text = `${prefix} ${type} ${city} ${street}`;

    if (doc.rooms) {
      text += ` ${doc.rooms} חדרים`;
    }

    if (doc.size) {
      text += ` ${doc.size} מ"ר`;
    }

    if (doc.price) {
      text += ` מחיר ${doc.price}`;
    }

    if (doc.tags && doc.tags.length > 0) {
      text += ` ${doc.tags.join(" ")}`;
    }

    return text.replace(/\s+/g, ' ').trim();
  }

  public embedProperty = async (property: ApartmentDocument): Promise<number[]> => {
    try {
      const pipe = await this.getPipeline();
      const text = this.buildSearchableText(property);

      const output = await pipe(text, { pooling: 'mean', normalize: true });
      return Array.from(output.data) as number[];
    } catch (error) {
      console.error("Error embedding property:", error);
      throw error;
    }
  }


  public embedQuery = async (query: string): Promise<number[]> => {
    try {
      const pipe = await this.getPipeline();
      const queryText = `query: ${query}`;
      const queryAptVector = await pipe(queryText, { pooling: 'mean', normalize: true });
      const queryVector = Array.from(queryAptVector.data) as number[];
      return queryVector;
    } catch (error) {
      console.error("Error embedding query:", error);
      throw error;
    }
  }


  public async talkWithTheAI(query: string) {
    try {
      const input_prompt = `
      ### System:
      You are a friendly and engaging real estate assistant.
      Your goal is to classify the user's intent and respond accordingly using JSON ONLY.

      ### Personality & Tone:
      - Be warm, helpful, and conversational (like a friendly agent on WhatsApp).
      - Avoid robotic or overly formal language.
      - Feel free to use emojis to make the conversation lighter.
      - If the user is just chatting, be polite and invite them to search for a property.

      ### Instructions:
      1. Analyze the user's input.
      2. Determine if the user is asking to find/search report for an apartment (Intent: "search") or just chatting/asking general questions (Intent: "chat").
      3. If "search": Extract filters (city, max_price, min_price). Set "reply" to a natural confirmation message (e.g., "מעולה, תן לי לבדוק מה יש לנו בתל אביב...").
      4. If "chat": Answer the user kindly in Hebrew. Set "filters" to null.

      ### Output Format (Strict JSON):
      {
      "is_search": boolean,
      "filters": {
          "city": string | null,
          "max_price": number | null,
          "min_price": number | null,
      } | null,
      "reply": string
      }

      ### Examples:
      User: "היי מה קורה?"
      Result: { "is_search": false, "filters": null, "reply": "היי! הכל מעולה 😄 אני כאן כדי לעזור לך למצוא את הבית הבא שלך. מה הכיוון?" }

      User: "מחפש דירה בתל אביב עד 2 מיליון"
      Result: { "is_search": true, "filters": { "city": "תל אביב", "max_price": 2000000, "min_price": null }, "reply": "אין בעיה! תל אביב זו אחלה בחירה. נותן הצצה מהירה במאגר שלנו עד 2 מיליון... 🧐" }

      User: "כמה עולה דירה בחולון?"
      Result: { "is_search": false, "filters": null, "reply": "זה מאוד תלוי בשכונה ובגודל הדירה... בחולון יש טווח מחירים רחב. תרצה שאחפש לך משהו ספציפי יותר? 🏠" }

      User: "אני רוצה בית עם גינה בחיפה"
      Result: { "is_search": true, "filters": { "city": "חיפה", "max_price": null, "min_price": null }, "reply": "נשמע חלומי! בודק לך אופציות לבתים עם גינה בחיפה עכשיו." }


      ### Current Input:
      User: "${query}"
      Result:

      *do not write any other text besides the JSON response. DO NOT FORGET { AT THE START AND } AT THE END AND RETURN ME THE ANSWER ON THE SAME TEMPLATE ON THE EXAMPLES!!*
      `
      const llm = await this.getLLM();
      const response = await llm.invoke(input_prompt)
      const start = response.indexOf('{');
      const end = response.lastIndexOf('}') + 1;
      const jsonStr = response.substring(start, end);
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Error extracting filters:", error);
      throw error;
    }
  }

}