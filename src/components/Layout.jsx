import { useState } from 'react';
import ActingDutySelector from '../pages/ActingDutySelector';
import Dashboard from '../pages/Dashboard';
import DepartmentManagement from '../pages/DepartmentManagement';
import DivisionManagement from '../pages/DivisionManagement';
// import EmailTemplateManager from '../pages/EmailTemplateManager';
import ActingDutyPage from '../pages/ActingDutyPage';
import ApprovalSearch from '../pages/ApprovalSearch';
import CriteriaForm from '../pages/CriteriaForm';
import EmployeeForm from '../pages/EmployeeForm';
import FlowApprove from '../pages/FlowApprove';
import HelpingGovernment from '../pages/HelpingGovernment';
import NotificationCenter from '../pages/NotificationCenter';
import PersonalInfoForm from '../pages/PersonalInfoForm';
import RequestSearch from '../pages/RequestSearch';
import TransferForm from '../pages/TransferForm';
import UserRoleAssignment from '../pages/UserRoleAssignment';
import UserSearchApp from '../pages/UserSearchApp';
import WirelessLANForm from '../pages/WirelessLANForm';
import WorkflowApproval from '../pages/WorkflowApproval';
import EmailTemplateManager from './EmailTemplate/EmailTemplateManager';
import { EOfficeRegistrationForm } from './Forms/InternetEoffice/EOfficeRegistrationForm';

const Layout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [, setIsOpen] = useState(true);
  
  const renderPage = () => {
    switch (currentPage) {
      // case 'users':
      //   return <Users />;
      // case 'products':
      //   return <Products />;
      // case 'orders':
      //   return <Orders />;
      // case 'reports':
      //   return <Reports />;
      case 'approve':
            return <FlowApprove />;
      case 'workflow':
              return <WorkflowApproval />;
      case 'workflow2':
                return <WorkflowApproval2 />;
      case 'actingDuty':
              return <ActingDutySelector />;
      case 'actingDutyPage':
              return <ActingDutyPage />;
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
      case 'helpinggovernment':
        return <HelpingGovernment />;
      case 'employees':
          return <EmployeeForm />;
      case 'resetpassword':
            return <ResetPassword />;
      case 'criteriaform':
              return <CriteriaForm />;
      case 'wirelesslanform':
        return <WirelessLANForm />;
      case 'userregistrationform':
        return <UserRegistrationForm />;

      case 'eofficeregistrationform':
          return <EOfficeRegistrationForm />;
      case 'requestsearch':
          return <RequestSearch />;
      case 'passwordchangerequestform':
          return <PasswordChangeRequestForm />;
      case 'approvalsearch':
          return <ApprovalSearch />;
      case 'userroleassignment':
            return <UserRoleAssignment />;
      case 'usersearchapp':
              return <UserSearchApp />;
         
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
              {/* <li>
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
              </li> */}
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
                  Work Flow Approval
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('workflow2')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Work Flow Approval 2
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
                  onClick={() => setCurrentPage('actingDutyPage')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Acting Duty Page
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
                  onClick={() => setCurrentPage('helpinggovernment')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                 Helping Government
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
              <li>
                <button
                  onClick={() => setCurrentPage('resetpassword')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Reset Password
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('criteriaform')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Criteria Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('wirelesslanform')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Wireless lan form
                </button>
              </li>

              <li>
                <button
                  onClick={() => setCurrentPage('userregistrationform')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  User Registration Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('eofficeregistrationform')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  E-Office Registration form
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('requestsearch')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  RequestSearch
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('passwordchangerequestform')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Passwor Change Request form
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('approvalsearch')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Approval Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('userroleassignment')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  User Role Assignment
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('usersearchapp')}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  User Search
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