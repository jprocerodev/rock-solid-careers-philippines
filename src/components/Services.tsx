
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

const countries = [
  {
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    positions: [
      'Domestic Workers',
      'Waiter',
      'Cleaner',
      'Housekeeper',
      'Nurse'
    ]
  },
  {
    name: 'Emirates',
    flag: '🇦🇪',
    positions: [
      'Domestic Workers',
      'Waiter',
      'Cleaner',
      'Housekeeper',
      'Nurse'
    ]
  },
  {
    name: 'Qatar',
    flag: '🇶🇦',
    positions: [
      'Domestic Workers',
      'Nurse'
    ]
  },
  {
    name: 'Oman',
    flag: '🇴🇲',
    positions: [
      'Domestic Workers'
    ]
  },
  {
    name: 'Kuwait',
    flag: '🇰🇼',
    positions: [
      'Domestic Workers'
    ]
  }
];

export const Services = () => {
  const handleScrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Our Services
          </div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            Countries We 
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Serve
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            We provide professional recruitment services for various positions across multiple Middle Eastern countries
          </p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {countries.map((country, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-3 group bg-white border-0 shadow-lg h-full">
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 text-center border-b">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                        {country.flag}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {country.name}
                      </h3>
                    </div>
                    
                    <div className="p-6 space-y-4 min-h-[200px] flex flex-col justify-between">
                      <div className="space-y-3">
                        {country.positions.map((position, posIndex) => (
                          <div key={posIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-300">
                            <span className="text-sm font-medium text-gray-700">
                              {position}
                            </span>
                            <Badge className="bg-gradient-to-r from-green-500 to-green-400 text-white text-xs">
                              Available
                            </Badge>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={handleScrollToContact}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white mt-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
