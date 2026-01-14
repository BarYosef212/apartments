import { Apartment } from 'src/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';
import { ApartmentCard } from './ApartmentCard';
import Autoplay from 'embla-carousel-autoplay';

export function CarouselSpacing({
  properties = [],
}: {
  properties: Apartment[];
}) {
  return (
    <div className='relative w-full overflow-visible flex justify-center'>
      <Carousel
        opts={{
          loop:true,
          align:'start'
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className='w-full pt-6 mx-12'
      >
        <CarouselContent className='-ml-1'>
          {properties.map((property, index) => (
            <CarouselItem
              key={index}
              className='pl-1 md:basis-1/2 lg:basis-1/3'
            >
              <div className='p-1 h-full'>
                <ApartmentCard
                  key={index}
                  apartment={property}
                  premium={true}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
