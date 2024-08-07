import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cat, Info, Paw, Facebook, Twitter, Instagram, Heart, ChevronDown, Star, Zap, Music } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const catImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
];

const catFacts = [
  { badge: "Vision", fact: "Cats have excellent night vision and can see at one-sixth the light level required for human vision." },
  { badge: "Group", fact: "A group of cats is called a 'clowder'." },
  { badge: "Sleep", fact: "Cats spend 70% of their lives sleeping." },
  { badge: "Hearing", fact: "A cat's hearing is much more sensitive than humans and dogs." },
  { badge: "Whiskers", fact: "Cat whiskers are the same width as their body, helping them navigate tight spaces." },
  { badge: "Purring", fact: "Cats purr at a frequency of 25 to 150 Hertz, which can promote bone density and healing." },
];

const catBreeds = [
  { breed: "Siamese", description: "Known for their distinctive coloring and vocal nature." },
  { breed: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance." },
  { breed: "Persian", description: "Recognized for their long fur and flat faces." },
  { breed: "Bengal", description: "A hybrid breed with a wild appearance resembling leopards." },
  { breed: "Sphynx", description: "Famous for their lack of fur and wrinkled skin." },
  { breed: "Scottish Fold", description: "Characterized by their folded ears and round faces." },
];

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const { toast } = useToast();

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizScore(0);
    toast({
      title: "Quiz Started!",
      description: "Good luck and have fun!",
    });
  };

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
    toast({
      title: "Thanks for the love!",
      description: "You're paw-some!",
    });
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-pink-200">
      <motion.div 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={catImages[currentImageIndex]}
            alt={`Cat ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
        <motion.div
          className="relative z-10 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Fascinating Felines
          </motion.h1>
          <motion.p 
            className="text-2xl mb-8 text-gray-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Discover the wonderful world of cats
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
              onClick={() => document.getElementById('content').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore More
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/20 transition-colors duration-300"
              onClick={handleLike}
            >
              <Heart className="mr-2 h-4 w-4" /> Like ({likeCount})
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/20 transition-colors duration-300"
                >
                  <Star className="mr-2 h-4 w-4" /> Subscribe
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Subscribe to Cat Facts</DialogTitle>
                  <DialogDescription>
                    Get daily cat facts delivered to your inbox!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" className="col-span-3" />
                  </div>
                </div>
                <DialogTrigger asChild>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
                </DialogTrigger>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <ChevronDown 
            className="w-12 h-12 text-white animate-bounce cursor-pointer" 
            onClick={() => document.getElementById('content').scrollIntoView({ behavior: 'smooth' })}
          />
        </motion.div>
      </motion.div>

      <div id="content" className="max-w-6xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="facts" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="facts" className="text-lg">
                <Info className="mr-2 h-5 w-5" />
                Feline Facts
              </TabsTrigger>
              <TabsTrigger value="breeds" className="text-lg">
                <Paw className="mr-2 h-5 w-5" />
                Cat Breeds
              </TabsTrigger>
              <TabsTrigger value="music" className="text-lg">
                <Music className="mr-2 h-5 w-5" />
                Cat Music
              </TabsTrigger>
            </TabsList>
            <TabsContent value="facts">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle className="text-2xl">Fascinating Feline Facts</CardTitle>
                  <CardDescription className="text-gray-200">Discover the wonders of our purr-fect companions</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Carousel className="w-full max-w-xs mx-auto">
                    <CarouselContent>
                      {catFacts.map((item, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                <div className="text-center">
                                  <Badge variant="secondary" className="mb-2 text-lg py-1 px-3">{item.badge}</Badge>
                                  <p className="text-sm text-gray-700">{item.fact}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  <CardTitle className="text-2xl">Popular Cat Breeds</CardTitle>
                  <CardDescription className="text-gray-200">Explore the diverse world of feline varieties</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Carousel className="w-full max-w-xs mx-auto">
                    <CarouselContent>
                      {catBreeds.map((item, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                <div className="text-center">
                                  <Badge className="mb-2 text-lg py-1 px-3">{item.breed}</Badge>
                                  <p className="text-sm text-gray-700">{item.description}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="music">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  <CardTitle className="text-2xl">Relaxing Cat Music</CardTitle>
                  <CardDescription className="text-gray-200">Soothing tunes for your feline friends</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Button
                      onClick={togglePlay}
                      className="bg-green-500 hover:bg-green-600 transition-colors duration-300"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <audio
                      ref={audioRef}
                      src="https://example.com/cat-music.mp3"
                      loop
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-pink-500 to-purple-500 text-white mb-12 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Cat className="mr-2 h-6 w-6" />
                Cat Quiz Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizStarted ? (
                <motion.div 
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl mb-6">Are you the ultimate cat expert? Test your feline knowledge!</p>
                  <Button 
                    onClick={startQuiz} 
                    size="lg" 
                    className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                  >
                    Start Quiz
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl mb-4">Quiz in progress... Meow-velous job!</p>
                  <p className="text-lg mb-2">Your current score:</p>
                  <div className="flex items-center justify-center">
                    <Progress value={quizScore} className="w-64 h-3 bg-purple-300" />
                    <motion.span 
                      className="ml-4 text-2xl font-bold"
                      key={quizScore}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {quizScore}%
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.footer
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-lg mb-4">Follow us for more purr-fect content:</p>
          <div className="flex justify-center space-x-6">
            {[
              { icon: Facebook, label: "Facebook", bgColor: "bg-blue-500", hoverColor: "hover:bg-blue-600" },
              { icon: Twitter, label: "Twitter", bgColor: "bg-sky-400", hoverColor: "hover:bg-sky-500" },
              { icon: Instagram, label: "Instagram", bgColor: "bg-pink-600", hoverColor: "hover:bg-pink-700" },
            ].map((social, index) => (
              <motion.div
                key={social.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className={`${social.bgColor} text-white ${social.hoverColor} transition-all duration-300`}
                >
                  <social.icon className="h-5 w-5 mr-2" /> {social.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
