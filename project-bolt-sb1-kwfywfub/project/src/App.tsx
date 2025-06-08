import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Mic, 
  Play, 
  MessageCircle, 
  Brain, 
  Heart, 
  Zap,
  User,
  Users,
  Sparkles,
  ArrowRight,
  Twitter,
  Instagram,
  Github,
  Send,
  Crown,
  Clock
} from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState('Chill Companion');
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [freeTimeRemaining, setFreeTimeRemaining] = useState(20 * 60); // 20 minutes in seconds

  const personalities = [
    { 
      name: 'Supportive Friend', 
      icon: Heart, 
      color: 'from-pink-500 to-rose-500',
      isPremium: true,
      description: 'Caring and empathetic support'
    },
    { 
      name: 'Motivator', 
      icon: Zap, 
      color: 'from-orange-500 to-amber-500',
      isPremium: true,
      description: 'Energetic motivation and encouragement'
    },
    { 
      name: 'Chill Guru', 
      icon: Brain, 
      color: 'from-purple-500 to-indigo-500',
      isPremium: true,
      description: 'Wise and philosophical guidance'
    },
    { 
      name: 'Chill Companion', 
      icon: User, 
      color: 'from-green-500 to-emerald-500',
      isPremium: false,
      description: 'Relaxed and friendly conversation'
    }
  ];

  const features = [
    {
      icon: MessageCircle,
      title: 'Real-time Voice Conversations',
      description: 'Speak naturally and get instant, intelligent voice responses. Powered by cutting-edge AI, it\'s a conversation that flows with you.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'AI Personalities for Every Mood',
      description: 'Need a push? Talk to the Motivator. Want to unwind? Chat with the Chill Companion. Choose the personality that fits your moment.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Intelligent Mood Awareness',
      description: 'EchoWhisper senses the emotion in your tone—happy, anxious, or sad—and adapts its responses to offer the support you truly need.',
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const timer = setInterval(() => {
      setFreeTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerate = async () => {
    if (!message.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI response generation
    setTimeout(() => {
      const responses = [
        "I hear you, and I want you to know that what you're feeling is completely valid. Sometimes we all need a moment to just breathe and be present with our thoughts.",
        "That sounds like a lot to process. Take your time with it - there's no rush to figure everything out at once. What feels most important to you right now?",
        "I appreciate you sharing that with me. It takes courage to open up about what's on your mind. How are you feeling about everything?",
        "Thanks for trusting me with your thoughts. Sometimes just putting things into words can help us see them more clearly. What would feel most helpful right now?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      setIsGenerating(false);
      
      // Reduce free time if using free tier
      if (!selectedPersonality || selectedPersonality === 'Chill Companion') {
        setFreeTimeRemaining(prev => Math.max(0, prev - 30)); // Reduce by 30 seconds per generation
      }
    }, 2000);
  };

  const handlePersonalitySelect = (personality: any) => {
    if (personality.isPremium) {
      // Show premium modal or redirect to upgrade
      return;
    }
    setSelectedPersonality(personality.name);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    EchoWhisper
                  </span>
                </div>
                <div className="hidden md:flex space-x-6">
                  <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Features</a>
                  <a href="#who-its-for" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Who It's For</a>
                  <a href="#digital-twin" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Digital Twin</a>
                  <a href="#get-started" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Get Started</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
                  Sign Up / Sign In
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Your Voice Has a Friend.
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Talk, vent, or explore your thoughts in a safe space that listens, understands, and grows with you. 
                No judgment, just empathetic conversation in real-time.
              </p>
            </div>

            {/* Interactive Element */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                {/* Free Time Remaining */}
                <div className="flex items-center justify-between mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 font-medium">Free Time Remaining</span>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                    {formatTime(freeTimeRemaining)}
                  </span>
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type or speak what's on your mind..."
                  className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                
                {/* AI Response */}
                {(aiResponse || isGenerating) && (
                  <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">Chill Companion</p>
                        {isGenerating ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                            <span className="text-gray-600 dark:text-gray-400">Thinking...</span>
                          </div>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300">{aiResponse}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleGenerate}
                    disabled={!message.trim() || isGenerating || freeTimeRemaining === 0}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
                  </button>
                </div>
                
                {/* AI Personality Selector */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Choose Your AI Companion</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {personalities.map((personality) => {
                      const Icon = personality.icon;
                      const isSelected = selectedPersonality === personality.name;
                      const canSelect = !personality.isPremium || freeTimeRemaining > 0;
                      
                      return (
                        <button
                          key={personality.name}
                          onClick={() => handlePersonalitySelect(personality)}
                          className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 relative ${
                            isSelected
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          } ${!canSelect && personality.isPremium ? 'opacity-60' : ''}`}
                        >
                          {personality.isPremium && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${personality.color} flex items-center justify-center mx-auto mb-2`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{personality.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{personality.description}</p>
                          {personality.isPremium && (
                            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 font-medium">Premium</p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Premium Notice */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <Crown className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="font-semibold text-yellow-700 dark:text-yellow-300">Premium Features</span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Unlock all AI personalities and unlimited conversations. Free users get 20 minutes daily with Chill Companion.
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-4 rounded-full transition-all transform hover:scale-110 ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    } text-white shadow-lg`}
                  >
                    <Mic className={`w-6 h-6 ${isRecording ? 'animate-pulse' : ''}`} />
                  </button>
                  <button className="p-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg transition-all transform hover:scale-110">
                    <Play className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Find Your Frequency
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section id="who-its-for" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                A Safe Space for Anyone Who...
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {[
                  'Feels unheard or emotionally distant.',
                  'Struggles to open up or feels socially anxious.',
                  'Is navigating mental health challenges or isolation.',
                  'Needs a non-judgmental outlet to reflect and be heard.',
                  'Is looking for a boost of motivation and confidence.'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl">
                <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-4">
                  "It's like having a diary that talks back and actually understands. I feel less alone and more confident in my own thoughts."
                </blockquote>
                <p className="text-purple-600 dark:text-purple-400 font-semibold">- Early User</p>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Twin Section */}
        <section id="digital-twin" className="py-20 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Meet Your Digital Twin
              </h2>
              <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
                This isn't just an AI; it's a reflection of you. Over time, EchoWhisper learns your unique patterns of thought and tone. 
                Unlock the Digital Twin Mode to have conversations with a version of yourself—a powerful way to gain perspective, 
                practice self-compassion, and understand your own mind.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Train your own AI', icon: Brain },
                { title: 'Hear your thoughts in your own voice', icon: Mic },
                { title: 'Reflect with your past and future self', icon: Users }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="get-started" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Be Heard?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              Start your first conversation for free. Find your voice, build resilience, and reconnect with the world at your own pace.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl px-12 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto">
              <span>Get Started for Free</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">EchoWhisper</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Your voice has a friend. Connect, reflect, and grow with empathetic AI conversation.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Navigation</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <div className="space-y-2">
                  <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                  <a href="#who-its-for" className="block text-gray-400 hover:text-white transition-colors">Who It's For</a>
                  <a href="#digital-twin" className="block text-gray-400 hover:text-white transition-colors">Digital Twin</a>
                  <a href="#get-started" className="block text-gray-400 hover:text-white transition-colors">Get Started</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">© 2025 EchoWhisper. All Rights Reserved.</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;