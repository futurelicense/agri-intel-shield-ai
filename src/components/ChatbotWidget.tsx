
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m your AgriShield AI assistant. I can help you with crop insights, weather data, and farming recommendations. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'What\'s my soil pH level?',
    'Should I irrigate today?',
    'What pest risks are expected?',
    'How is my crop health?',
    'Weather forecast for this week',
    'Show me crop performance trends',
    'What irrigation is needed?',
    'Market prices for my crops?',
    'Best planting schedule?'
  ];

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let aiResponse = '';
      
      if (userMessage.toLowerCase().includes('soil') || userMessage.toLowerCase().includes('ph')) {
        aiResponse = 'Based on your current soil analysis, your pH level is 6.8, which is optimal for most crops. Your soil shows good organic carbon content at 1.2%. I recommend monitoring potassium levels as they\'re slightly below optimal range.';
      } else if (userMessage.toLowerCase().includes('water') || userMessage.toLowerCase().includes('irrigat')) {
        aiResponse = 'Current soil moisture is at 65%, which is in the optimal range. However, weather forecast shows low rainfall for the next 3 days. I recommend light irrigation tomorrow morning to maintain moisture levels.';
      } else if (userMessage.toLowerCase().includes('pest')) {
        aiResponse = 'Pest risk is currently HIGH at 68%. Weather conditions favor aphid activity. I recommend: 1) Increase field monitoring, 2) Consider beneficial insect release, 3) Apply organic neem oil if population exceeds threshold.';
      } else if (userMessage.toLowerCase().includes('crop') || userMessage.toLowerCase().includes('health')) {
        aiResponse = 'Your crop health looks good! NDVI index is 0.75, indicating healthy vegetation. Field A shows excellent growth, while Field B could benefit from additional nutrients. Overall crop stress is low.';
      } else if (userMessage.toLowerCase().includes('weather')) {
        aiResponse = 'This week\'s forecast: Today 24°C (partly cloudy), Tomorrow 26°C (sunny), Wednesday 22°C (rain expected). High humidity midweek may increase disease pressure. Monitor crops closely on Wednesday.';
      } else if (userMessage.toLowerCase().includes('performance') || userMessage.toLowerCase().includes('trend')) {
        aiResponse = 'Your crop performance shows a 12% improvement over last season. Yield predictions are up 8% based on current growth rates. The eastern field is performing exceptionally well with NDVI values of 0.85.';
      } else if (userMessage.toLowerCase().includes('irrigation') || userMessage.toLowerCase().includes('water')) {
        aiResponse = 'Based on soil moisture sensors and weather forecasts, I recommend increasing irrigation by 20% in the next 48 hours. Focus on the southern fields where moisture levels are at 65% of optimal.';
      } else if (userMessage.toLowerCase().includes('market') || userMessage.toLowerCase().includes('price')) {
        aiResponse = 'Current market prices for corn are $6.45/bushel, up 3% from last week. Soybean prices at $14.20/bushel show stable demand. Consider timing your harvest for optimal market conditions.';
      } else if (userMessage.toLowerCase().includes('plant') || userMessage.toLowerCase().includes('schedule')) {
        aiResponse = 'Optimal planting window for your region opens in 2 weeks. Soil temperature is approaching 55°F threshold. I recommend preparing seed beds now and scheduling planting for maximum yield potential.';
      } else {
        aiResponse = 'I understand you\'re asking about your farm operations. Based on current data: Overall risk is moderate (42%), with pest activity being the main concern. Weather is favorable for next 2 days. Feel free to ask me about specific topics like weather, soil health, crop performance, market prices, irrigation, or planting schedules. How can I help you optimize your farming operations?';
      }
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        message: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'user',
        message: inputMessage,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      simulateAIResponse(inputMessage);
      setInputMessage('');
    }
  };

  const handleQuickQuestion = (question: string) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type: 'user',
      message: question,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    simulateAIResponse(question);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg animate-pulse"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
          AI
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`bg-white shadow-xl border-2 border-green-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      }`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 p-1.5 rounded-full">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">AgriShield AI Assistant</CardTitle>
                <CardDescription className="text-xs">Powered by Hugging Face</CardDescription>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-4 pt-0 flex flex-col h-full">
            {/* Messages */}
            <ScrollArea className="flex-1 mb-4 h-80">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-2 ${
                      msg.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.type === 'bot' && (
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <Bot className="h-3 w-3 text-green-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs p-3 rounded-lg text-sm ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                    {msg.type === 'user' && (
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <User className="h-3 w-3 text-blue-600" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-2">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <Bot className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2 font-medium">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs px-2 py-1 h-auto"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about your farm..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="text-sm"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                size="sm"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatbotWidget;
