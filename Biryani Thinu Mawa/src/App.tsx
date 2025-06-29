import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, MapPin, Phone, Mail, Star, ChefHat, Clock, Truck } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  spiceLevel: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Hyderabadi Dum Biryani",
    description: "The OG king of biryanis! Slow-cooked perfection that'll make you go 'Wah Bhai Wah!'",
    price: 299,
    image: "https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    spiceLevel: 3
  },
  {
    id: 2,
    name: "Chicken Tikka Biryani",
    description: "For those who like their biryani with extra swag! Tender tikka pieces that hit different.",
    price: 349,
    image: "https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    spiceLevel: 4
  },
  {
    id: 3,
    name: "Mutton Biryani",
    description: "The heavyweight champion! So good, it'll make you forget all your problems.",
    price: 399,
    image: "https://images.pexels.com/photos/14737/pexels-photo-14737.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    spiceLevel: 3
  },
  {
    id: 4,
    name: "Veg Biryani",
    description: "Don't underestimate the veggie power! Packed with flavors that even non-veggies approve.",
    price: 249,
    image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    spiceLevel: 2
  },
  {
    id: 5,
    name: "Fish Biryani",
    description: "Coastal vibes meet biryani magic! Fresh catch with aromatic rice - pure coastal bliss.",
    price: 329,
    image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    spiceLevel: 3
  },
  {
    id: 6,
    name: "Egg Biryani",
    description: "Budget-friendly but taste-rich! Perfect for those 'paisa nahi hai but biryani khana hai' moments.",
    price: 199,
    image: "https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    spiceLevel: 2
  }
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'menu', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    const existingItem = cart.find(cartItem => cartItem.id === id);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === id 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== id));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty! Add some delicious biryani first.');
      return;
    }
    
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      alert('Please fill in all details!');
      return;
    }

    alert('🎉 Order placed successfully! Your biryani will reach you in 30-45 minutes. Get ready for some yummy goodness!');
    setCart([]);
    setShowOrderForm(false);
    setCustomerDetails({ name: '', phone: '', address: '' });
  };

  const SpiceIndicator = ({ level }: { level: number }) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < level ? 'bg-red-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">Biryani Thinu Mawa</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'menu', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize font-medium transition-colors ${
                    currentSection === section 
                      ? 'text-orange-600' 
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowCart(!showCart)}
              className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{getTotalItems()}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Your cart is empty! <br />
                  Add some delicious biryani 🍚
                </p>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <p className="text-orange-600 font-bold">₹{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-8 h-8 flex items-center justify-center bg-orange-600 text-white rounded-full hover:bg-orange-700"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center text-xl font-bold mb-4">
                      <span>Total: ₹{getTotalPrice()}</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        setShowOrderForm(true);
                      }}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Proceed to Order
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                  placeholder="Your complete address"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Order Total: ₹{getTotalPrice()}</p>
                <p className="text-sm text-gray-600">{getTotalItems()} items</p>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowOrderForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                  Biryani
                  <span className="block text-orange-600">Thinu Mawa!</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  The only place where your biryani cravings get the respect they deserve! 
                  <span className="block font-semibold text-orange-700 mt-2">
                    "Biryani nahi hai toh life kya hai?" 🤷‍♂️
                  </span>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">30-45 min delivery</span>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <Truck className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Free delivery above ₹299</span>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <Star className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">4.8/5 rating</span>
                </div>
              </div>

              <button
                onClick={() => scrollToSection('menu')}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Order Now & Make Your Day! 🍚
              </button>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Delicious Biryani"
                  className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl transform scale-105 -rotate-6 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Our Biryani Arsenal 🔥
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each biryani is crafted with love, spices, and the secret ingredient - 
              <span className="font-semibold text-orange-600"> pure passion!</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow-lg">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{item.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <div className="text-right">
                      <p className="text-2xl font-black text-orange-600">₹{item.price}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Spice Level:</span>
                      <SpiceIndicator level={item.spiceLevel} />
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                Why We're The 
                <span className="block text-orange-600">Biryani Champions! 👑</span>
              </h2>
              
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  <strong>The Story:</strong> Started by biryani addicts, for biryani addicts! We understand the pain of bad biryani and the joy of perfect biryani.
                </p>
                
                <p>
                  <strong>The Mission:</strong> To make sure no one in this city goes to bed without having amazing biryani. Because life's too short for mediocre biryani!
                </p>
                
                <p>
                  <strong>The Promise:</strong> Every grain of rice is treated like gold, every piece of meat like treasure. We don't just cook biryani - we create edible poetry! 📜✨
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fun Facts About Us:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• We've served over 50,000+ satisfied biryani lovers</li>
                  <li>• Our chefs have 15+ years of biryani expertise</li>
                  <li>• We use 23 different spices in our masala</li>
                  <li>• 98% of our customers become repeat customers (biryani addiction is real!)</li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Chef preparing biryani"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-4 rounded-xl shadow-lg">
                <p className="font-bold text-lg">"Biryani is not just food,</p>
                <p className="font-bold text-lg">it's an emotion!" 💝</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Ready for Some Biryani Magic? ✨
            </h2>
            <p className="text-xl text-gray-300">
              Hit us up! We're always excited to talk biryani with fellow enthusiasts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-800 rounded-2xl">
              <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Visit Our Kitchen</h3>
              <p className="text-gray-300">
                123 Biryani Street,<br />
                Flavor Town, FT 12345<br />
                (Next to the place where magic happens!)
              </p>
            </div>

            <div className="text-center p-8 bg-gray-800 rounded-2xl">
              <Phone className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Call Us Now</h3>
              <p className="text-gray-300 mb-2">
                +91 98765 43210<br />
                +91 87654 32109
              </p>
              <p className="text-sm text-orange-400">
                Open 11 AM - 11 PM (Because biryani cravings don't follow schedules!)
              </p>
            </div>

            <div className="text-center p-8 bg-gray-800 rounded-2xl">
              <Mail className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-300">
                hello@biryanithinumawa.com<br />
                orders@biryanithinumawa.com
              </p>
              <p className="text-sm text-orange-400 mt-2">
                We reply faster than our delivery time!
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-2xl font-bold text-orange-500 mb-4">
              "Ek baar biryani kha ke dekho, phir batana!" 😋
            </p>
            <button
              onClick={() => scrollToSection('menu')}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transform hover:scale-105 transition-all duration-200"
            >
              Order Your Happiness Now! 🎉
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <ChefHat className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-bold">Biryani Thinu Mawa</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                Made with ❤️ and lots of biryani by food lovers, for food lovers.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                © 2024 Biryani Thinu Mawa. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;