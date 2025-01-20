import { useState } from 'react';
import ActingDutySelector from '../pages/ActingDutySelector';
import Dashboard from '../pages/Dashboard';
import DepartmentManagement from '../pages/DepartmentManagement';
import DivisionManagement from '../pages/DivisionManagement';
// import EmailTemplateManager from '../pages/EmailTemplateManager';
import EmployeeForm from '../pages/EmployeeForm';
import FlowApprove from '../pages/FlowApprove';
import NotificationCenter from '../pages/NotificationCenter';
import Orders from '../pages/Orders';
import PersonalInfoForm from '../pages/PersonalInfoForm';
import Products from '../pages/Products';
import Reports from '../pages/Reports';
import ServiceTransferForm from '../pages/ServiceTransferForm';
import TransferForm from '../pages/TransferForm';
import Users from '../pages/Users';
import WorkflowApproval from '../pages/WorkflowApproval';
import EmailTemplateManager from './EmailTemplate/EmailTemplateManager';

const Layout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(true);
  
  const renderPage = () => {
    switch (currentPage) {
      case 'users':
        return <Users />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      case 'reports':
        return <Reports />;
      case 'approve':
            return <FlowApprove />;
      case 'workflow':
              return <WorkflowApproval />;
      case 'actingDuty':
              return <ActingDutySelector />;
      case 'notification':
              return <NotificationCenter />;
      case 'personinfoform':
            return <PersonalInfoForm />;
            
      case 'transferform':
       return <TransferForm onClose={() => setIsOpen(false)} />;
      case 'emailtemplate':
            return <EmailTemplateManager />;
      case 'divisionmanagement':
            return <DivisionManagement />;
      case 'departmentmanagement':
        return <DepartmentManagement />;
      case 'servicetransferform':
        return <ServiceTransferForm />;
      case 'employees':
          return <EmployeeForm />;
            
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Your App Name</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className="hover:text-blue-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('profile')}
                  className="hover:text-blue-200"
                >
                  Profile
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('settings')}
                  className="hover:text-blue-200"
                >
                  Settings
                </button>
              </li>
            </ul>
          </nav>
          <div className="relative">
            <NotificationCenter />
          </div>
        </div>
       
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100 p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('users')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Users
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('products')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('orders')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('reports')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('approve')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Approve
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('workflow')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Work Flow Approvval
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('actingDuty')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Acting Duty
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('personinfoform')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Person Info form
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('transferform')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Transfer Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('emailtemplate')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Email Template Manager
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('divisionmanagement')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Division Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('departmentmanagement')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Department management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('servicetransferform')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Service Transfer form
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('employees')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Employee Form
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 bg-gray-50">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Layout;