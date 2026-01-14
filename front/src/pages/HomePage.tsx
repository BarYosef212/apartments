import { Link } from 'react-router-dom';
import { Button, Card, CardContent } from '../components/ui';
import { CarouselSpacing } from '../components/CarouselSpacing';
import { useEffect, useState } from 'react';
import { Apartment } from 'src/types';
import { useApartmentsApi } from '../hooks/useApartmentsApi';

export function HomePage() {
  const [premimumApartments, setPremimumApartments] = useState<Apartment[]>([]);
  const { fetchPremiumProperties } = useApartmentsApi();
  useEffect(() => {
    const fetchPremimums = async () => {
      try {
        const res = await fetchPremiumProperties();
        console.log(res);
        setPremimumApartments(res);
      } catch (error) {}
    };
    fetchPremimums();
  }, []);

  return (
    <div className='mx-auto flex max-w-6xl flex-col px-4 pb-10 pt-6'>
      <main
        className={`flex flex-1 flex-col gap-10 md:flex-row md:items-center pb-10 ${
          premimumApartments.length > 0 ? 'border-b-2':''
        }`}
      >
        <section className='flex-1 space-y-6 text-right'>
          <h1 className='text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl'>
            נדל&quot;ן פשוט וברור.
          </h1>
          <p className='max-w-xl text-sm text-muted-foreground'>
            אתר לחיפוש דירות, סינון לפי עיר ופרטים, וניהול מודעות בלוח ניהול
            פשוט.
          </p>
          <div className='flex flex-wrap items-center justify-start gap-3'>
            <Button>
              <Link to='/apartments'>צפה בדירות</Link>
            </Button>
          </div>
        </section>

        <section className='flex-1'>
          <Card className='border-dashed'>
            <CardContent className='space-y-4'>
              <div className='h-40 rounded-2xl bg-muted' />
              <div className='space-y-2'>
                <div className='h-3 w-32 rounded-full bg-muted' />
                <div className='h-3 w-48 rounded-full bg-muted' />
              </div>
              <div className='grid grid-cols-3 gap-2'>
                <div className='h-20 rounded-2xl bg-muted' />
                <div className='h-20 rounded-2xl bg-muted' />
                <div className='h-20 rounded-2xl bg-muted' />
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {premimumApartments.length > 0 && (
        <section className='space-y-6 pt-12'>
          <div className='space-y-3 text-right'>
            <h2 className='text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl'>
              המלצות
            </h2>
            <p className='max-w-xl text-sm text-muted-foreground'>
              בחרנו עבורך את הנכסים הטובים ביותר
            </p>
          </div>
          <CarouselSpacing properties={premimumApartments} />
        </section>
      )}
    </div>
  );
}
