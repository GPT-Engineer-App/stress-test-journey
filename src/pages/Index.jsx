import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Cat, Info, Paw } from "lucide-react";

const catImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
];

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100">
      <motion.h1 
        className="text-5xl font-bold mb-8 text-center text-purple-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Fascinating Felines
      </motion.h1>
      
      <div className="max-w-5xl mx-auto">
        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <img 
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[500px] rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        
        <Tabs defaultValue="facts" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facts">
              <Info className="mr-2 h-4 w-4" />
              Feline Facts
            </TabsTrigger>
            <TabsTrigger value="breeds">
              <Paw className="mr-2 h-4 w-4" />
              Cat Breeds
            </TabsTrigger>
          </TabsList>
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle>Fascinating Feline Facts</CardTitle>
                <CardDescription>Discover the wonders of our purr-fect companions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge variant="outline" className="mr-2">Vision</Badge>
                    Cats have excellent night vision and can see at one-sixth the light level required for human vision.
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge variant="outline" className="mr-2">Group</Badge>
                    A group of cats is called a "clowder".
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge variant="outline" className="mr-2">Sleep</Badge>
                    Cats spend 70% of their lives sleeping.
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge variant="outline" className="mr-2">Hearing</Badge>
                    A cat's hearing is much more sensitive than humans and dogs.
                  </motion.li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
                <CardDescription>Explore the diverse world of feline varieties</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge className="mr-2">Siamese</Badge>
                    Known for their distinctive coloring and vocal nature.
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge className="mr-2">Maine Coon</Badge>
                    One of the largest domesticated cat breeds with a distinctive physical appearance.
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge className="mr-2">Persian</Badge>
                    Recognized for their long fur and flat faces.
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge className="mr-2">Bengal</Badge>
                    A hybrid breed with a wild appearance resembling leopards.
                  </motion.li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cat className="mr-2" />
              Did You Know?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Cats have been domesticated for around 4,000 years, making them one of humanity's oldest animal companions!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
