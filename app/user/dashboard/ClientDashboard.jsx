"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
// import { useSession } from "next-auth/react";
import { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  User, 
  Settings, 
  AlertCircle,
  Loader2,
  Lock,
  Sparkles
} from 'lucide-react';

// export default function Dashboard() {
//   const [userName, setUserName] = useState('Sandesh Rajbhandari');
//   const [plan, setPlan] = useState('Free');
  
//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 border-r border-gray-200 bg-white">
//         <div className="flex items-center p-6 border-b border-gray-200">
//           <h1 className="text-2xl font-bold">twain</h1>
//           <span className="ml-2 bg-blue-500 text-white text-sm font-bold py-1 px-2 rounded">GPT</span>
//         </div>

//         <nav className="p-4">
//           <div className="space-y-1">
//             <a href="#" className="flex items-center text-blue-600 px-4 py-2 rounded-md font-medium">
//               <Home className="mr-2 h-5 w-5" />
//               Dashboard
//             </a>
            
//             <a href="#" className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
//               <FileText className="mr-2 h-5 w-5" />
//               Documents
//             </a>
//           </div>

//           <div className="mt-8">
//             <h3 className="px-4 text-sm font-medium text-gray-500">Tools</h3>
//             <div className="mt-2 space-y-1">
//               <a href="#" className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
//                 <User className="mr-2 h-5 w-5" />
//                 Humanizer
//               </a>
//               <a href="#" className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
//                 <AlertCircle className="mr-2 h-5 w-5" />
//                 AI Detector
//               </a>
//               <a href="#" className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
//                 <FileText className="mr-2 h-5 w-5" />
//                 Writing Generator
//               </a>
//             </div>
//           </div>

//           <div className="absolute bottom-24 w-52">
//             <a href="#" className="flex items-center text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium">
//               <Sparkles className="mr-2 h-5 w-5" />
//               Upgrade Plan
//             </a>
//             <a href="#" className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
//               <Settings className="mr-2 h-5 w-5" />
//               Help
//             </a>
//           </div>
          
//           <div className="absolute bottom-6 w-52">
//             <div className="flex items-center px-4 py-2">
//               <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
//                 <User className="h-5 w-5 text-gray-600" />
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-gray-900">Sandesh</p>
//                 <p className="text-xs text-gray-500">Rajbhandari</p>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto p-8">
//         <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        
//         <Card className="mb-8">
//           <CardContent className="pt-6">
//             <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}</h2>
//             <div className="flex items-center mb-4">
//               <p className="text-gray-600">Current Plan: <span className="text-blue-500 font-medium">{plan}</span></p>
//             </div>
//             <Button className="bg-blue-500 hover:bg-blue-600">Upgrade Plan</Button>
//           </CardContent>
//         </Card>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {/* Humanizer Card */}
//           <Card className="relative">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex justify-between">
//                 <span>Humanizer</span>
//                 <User className="text-blue-500" />
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <h3 className="text-4xl font-bold text-blue-500">250</h3>
//               <p className="text-gray-500">words available</p>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full bg-blue-500 hover:bg-blue-600">
//                 Start using <span className="ml-1">→</span>
//               </Button>
//             </CardFooter>
//           </Card>
          
//           {/* AI Detector Card */}
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="flex justify-between">
//                 <span>AI Detector</span>
//                 <AlertCircle className="text-green-500" />
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <h3 className="text-4xl font-bold text-green-500">0</h3>
//               <p className="text-gray-500">uses this month</p>
//               <p className="text-gray-500">5 uses remaining</p>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full bg-green-500 hover:bg-green-600">
//                 Start using <span className="ml-1">→</span>
//               </Button>
//             </CardFooter>
//           </Card>
          
//           {/* Writing Generator Card */}
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="flex justify-between">
//                 <span>Writing Generator</span>
//                 <FileText className="text-purple-500" />
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col items-center justify-center py-8">
//               <Lock className="h-12 w-12 text-gray-300 mb-2" />
//               <p className="text-gray-500">Upgrade to use</p>
//             </CardContent>
//             <CardFooter>
//               {/* This button is disabled */}
//               <Button className="w-full" variant="outline" disabled>
//                 Upgrade to use
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
        
//         {/* Recent Documents */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Recent Documents</h2>
//           <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-gray-200">
//             <div className="h-16 w-16 text-gray-300 mb-4">
//               <FileText className="h-full w-full" />
//             </div>
//             <p className="text-lg font-medium text-gray-700">No recent documents</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
const ClientDashboard = ({ session, manage_link, hasSub, checkoutLink }) => {
  // const { data: session2, status } = useSession();
  // console.log(status, session2);
  const userName = session?.user?.name;
  // console.log(session)
  const plan = session.plan;
  return (
<main className="flex-1 overflow-y-auto p-8 bg-gray-50">
        {/* <h1 className="text-3xl font-bold mb-4">Dashboard</h1> */}
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}</h2>
            <div className="flex items-center mb-4">
              <p className="text-gray-600">Current Plan: <span className="text-blue-500 font-medium">{plan}</span></p>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600">Upgrade Plan</Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Humanizer Card */}
          <Card className="relative">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>Humanizer</span>
                <User className="text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-4xl font-bold text-blue-500">250</h3>
              <p className="text-gray-500">words available</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Start using <span className="ml-1">→</span>
              </Button>
            </CardFooter>
          </Card>
          
          {/* AI Detector Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>AI Detector</span>
                <AlertCircle className="text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-4xl font-bold text-green-500">0</h3>
              <p className="text-gray-500">uses this month</p>
              <p className="text-gray-500">5 uses remaining</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Start using <span className="ml-1">→</span>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Writing Generator Card */}
          {/* <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>Writing Generator</span>
                <FileText className="text-purple-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Lock className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-gray-500">Upgrade to use</p>
            </CardContent>
            <CardFooter>
              
              <Button className="w-full" variant="outline" disabled>
                Upgrade to use
              </Button>
            </CardFooter>
          </Card> */}
        </div>
        
        {/* Recent Documents */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Documents</h2>
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-gray-200">
            <div className="h-16 w-16 text-gray-300 mb-4">
              <FileText className="h-full w-full" />
            </div>
            <p className="text-lg font-medium text-gray-700">No recent documents</p>
          </div>
        </div>
      </main>
  );
};

export default ClientDashboard;
