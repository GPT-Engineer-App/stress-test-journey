import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cat, Info, Paw, Facebook, Twitter, Instagram } from "lucide-react";

const catImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
];

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={catImages[currentImageIndex]}
            alt={`Cat ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <motion.div
          className="relative z-10 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-4">Fascinating Felines</h1>
          <p className="text-xl mb-8">Discover the wonderful world of cats</p>
          <Button
            size="lg"
            onClick={() => document.getElementById('content').scrollIntoView({ behavior: 'smooth' })}
          >
            Explore More
          </Button>
        </motion.div>
      </div>

      <div id="content" className="max-w-5xl mx-auto p-8">
        <Tabs defaultValue="facts" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 mb-8">
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
                  {[
                    { badge: "Vision", fact: "Cats have excellent night vision and can see at one-sixth the light level required for human vision." },
                    { badge: "Group", fact: "A group of cats is called a 'clowder'." },
                    { badge: "Sleep", fact: "Cats spend 70% of their lives sleeping." },
                    { badge: "Hearing", fact: "A cat's hearing is much more sensitive than humans and dogs." },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Badge variant="outline" className="mr-2">{item.badge}</Badge>
                      {item.fact}
                    </motion.li>
                  ))}
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
                  {[
                    { breed: "Siamese", description: "Known for their distinctive coloring and vocal nature." },
                    { breed: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance." },
                    { breed: "Persian", description: "Recognized for their long fur and flat faces." },
                    { breed: "Bengal", description: "A hybrid breed with a wild appearance resembling leopards." },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Badge className="mr-2">{item.breed}</Badge>
                      {item.description}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-gradient-to-r from-pink-500 to-purple-500 text-white mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cat className="mr-2" />
              Cat Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!quizStarted ? (
              <div className="text-center">
                <p className="text-lg mb-4">Test your cat knowledge!</p>
                <Button onClick={startQuiz}>Start Quiz</Button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg mb-4">Quiz in progress...</p>
                <p>Your current score: {quizScore}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <footer className="text-center">
          <p className="mb-4">Follow us for more cat content:</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Instagram className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
