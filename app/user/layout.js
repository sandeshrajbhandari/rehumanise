export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import NeedSignIn from "@/components/NeedSignIn";
import { createCustomerIfNull } from "@app/lib/billing";
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

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <NeedSignIn />;
  }

  await createCustomerIfNull();

  return <>
  <div className="flex w-full px-4">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white">
              {/* <div className="flex items-center p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold">twain</h1>
                <span className="ml-2 bg-blue-500 text-white text-sm font-bold py-1 px-2 rounded">GPT</span>
              </div> */}
      
              <nav className="p-4">
                <div className="space-y-1">
                  <a href="#" className="flex items-center text-blue-600 px-4 py-2 rounded-md font-medium">
                    <Home className="mr-2 h-5 w-5" />
                    Dashboard
                  </a>
                  
                  {/* <a href="#" className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
                    <FileText className="mr-2 h-5 w-5" />
                    Documents
                  </a> */}
                </div>
      
                <div className="mt-8">
                  <h3 className="px-4 text-sm font-medium text-gray-500">Tools</h3>
                  <div className="mt-2 space-y-1">
                    <a href="/user/rewrite" className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
                      <User className="mr-2 h-5 w-5" />
                      Humanizer
                    </a>
                    <a href="#" className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      AI Detector
                    </a>
                    <a href="#" className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
                      <FileText className="mr-2 h-5 w-5" />
                      Writing Generator
                    </a>
                  </div>
                </div>
      
                <div className="absolute bottom-24 w-52">
                  <a href="#" className="flex items-center text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Upgrade Plan
                  </a>
                  <a href="#" className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
                    <Settings className="mr-2 h-5 w-5" />
                    Help
                  </a>
                </div>
                
                {/* <div className="absolute bottom-6 w-52">
                  <div className="flex items-center px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Sandesh</p>
                      <p className="text-xs text-gray-500">Rajbhandari</p>
                    </div>
                  </div>
                </div> */}
              </nav>
            </aside>
  <div className="flex-1 min-w-0">
    {children}
  </div>
  </div></>;
}

