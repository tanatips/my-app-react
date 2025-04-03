import { AlertTriangle, Calendar, ChevronDown, ChevronUp, Clock, Download, FileText, Filter, Info, RefreshCw, Search, Server, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// สร้างข้อมูลตัวอย่างจาก log ที่ให้มา
const generateSampleData = () => {
  return [
    {
      id: 1,
      timestamp: '01-Apr-2025 07:21:32.442',
      level: 'WARNING',
      thread: 'http-nio-8080-exec-38',
      source: 'org.apache.catalina.loader.WebappClassLoaderBase.clearReferencesThreads',
      message: 'The web application [egp-adsso01-service] appears to have started a thread named [Thread-64] but has failed to stop it. This is very likely to create a memory leak.',
      stackTrace: 'java.base@17.0.14/jdk.internal.misc.Unsafe.park(Native Method)\n java.base@17.0.14/java.util.concurrent.locks.LockSupport.park(LockSupport.java:341)\n java.base@17.0.14/java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode.block(AbstractQueuedSynchronizer.java:506)\n java.base@17.0.14/java.util.concurrent.ForkJoinPool.unmanagedBlock(ForkJoinPool.java:3465)',
      application: 'egp-adsso01-service'
    },
    {
      id: 2,
      timestamp: '01-Apr-2025 07:21:32.443',
      level: 'WARNING',
      thread: 'http-nio-8080-exec-38',
      source: 'org.apache.catalina.loader.WebappClassLoaderBase.clearReferencesThreads',
      message: 'The web application [egp-adsso01-service] appears to have started a thread named [boundedElastic-evictor-1] but has failed to stop it. This is very likely to create a memory leak.',
      stackTrace: 'java.base@17.0.14/jdk.internal.misc.Unsafe.park(Native Method)\n java.base@17.0.14/java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:252)\n java.base@17.0.14/java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(AbstractQueuedSynchronizer.java:1679)',
      application: 'egp-adsso01-service'
    },
    {
      id: 3,
      timestamp: '01-Apr-2025 07:21:32.534',
      level: 'INFO',
      thread: 'http-nio-8080-exec-38',
      source: 'org.apache.catalina.startup.HostConfig.undeploy',
      message: 'Undeploying context [/egp-adsso01-service]',
      stackTrace: '',
      application: 'egp-adsso01-service'
    },
    {
      id: 4,
      timestamp: '01-Apr-2025 07:24:04.678',
      level: 'INFO',
      thread: 'http-nio-8080-exec-44',
      source: 'org.apache.catalina.startup.HostConfig.deployWAR',
      message: 'Deploying web application archive [/opt/tomcat11/webapps/egp-adsso01-service.war]',
      stackTrace: '',
      application: 'egp-adsso01-service'
    },
    {
      id: 5,
      timestamp: '01-Apr-2025 07:24:10.251',
      level: 'INFO',
      thread: 'http-nio-8080-exec-44',
      source: 'org.apache.jasper.servlet.TldScanner.scanJars',
      message: 'At least one JAR was scanned for TLDs yet contained no TLDs. Enable debug logging for this logger for a complete list of JARs that were scanned but no TLDs were found in them. Skipping unneeded JARs during scanning can improve startup time and JSP compilation time.',
      stackTrace: '',
      application: 'egp-adsso01-service'
    },
    {
      id: 6,
      timestamp: '01-Apr-2025 07:24:26.962',
      level: 'INFO',
      thread: 'http-nio-8080-exec-44',
      source: 'org.apache.catalina.startup.HostConfig.deployWAR',
      message: 'Deployment of web application archive [/opt/tomcat11/webapps/egp-adsso01-service.war] has finished in [22,284] ms',
      stackTrace: '',
      application: 'egp-adsso01-service'
    },
    {
      id: 7,
      timestamp: '01-Apr-2025 14:46:25.411',
      level: 'WARNING',
      thread: 'http-nio-8080-exec-53',
      source: 'org.apache.catalina.loader.WebappClassLoaderBase.clearReferencesThreads',
      message: 'The web application [egp-adsso01-service] appears to have started a thread named [Thread-252] but has failed to stop it. This is very likely to create a memory leak.',
      stackTrace: 'java.base@17.0.14/jdk.internal.misc.Unsafe.park(Native Method)\n java.base@17.0.14/java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:252)',
      application: 'egp-adsso01-service'
    },
    {
      id: 8,
      timestamp: '01-Apr-2025 17:50:09.999',
      level: 'WARNING',
      thread: 'http-nio-8080-exec-80',
      source: 'org.apache.catalina.loader.WebappClassLoaderBase.clearReferencesThreads',
      message: 'The web application [egp-adauth01-service] appears to have started a thread named [HttpClient-1-SelectorManager] but has failed to stop it. This is very likely to create a memory leak.',
      stackTrace: 'java.base@17.0.14/sun.nio.ch.EPoll.wait(Native Method)\n java.base@17.0.14/sun.nio.ch.EPollSelectorImpl.doSelect(EPollSelectorImpl.java:118)',
      application: 'egp-adauth01-service'
    }
  ];
};

const LogDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [filters, setFilters] = useState({
    level: '',
    application: '',
    dateFrom: '',
    dateTo: '',
    source: ''
  });

  // โหลดข้อมูล log สำหรับตัวอย่าง
  useEffect(() => {
    // ในสถานการณ์จริงควรจะมีการเรียก API เพื่อโหลดข้อมูล log
    const sampleLogs = generateSampleData();
    setLogs(sampleLogs);
    setFilteredLogs(sampleLogs);
  }, []);

  // ฟังก์ชันในการค้นหาและกรองข้อมูล
  const handleSearch = () => {
    let results = [...logs];

    // ค้นหาตามข้อความ
    if (searchTerm) {
      results = results.filter(log => 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.thread.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.stackTrace.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // กรองตามระดับความสำคัญ
    if (filters.level) {
      results = results.filter(log => log.level === filters.level);
    }

    // กรองตามแอพพลิเคชัน
    if (filters.application) {
      results = results.filter(log => log.application === filters.application);
    }

    // กรองตามแหล่งที่มา
    if (filters.source) {
      results = results.filter(log => log.source.includes(filters.source));
    }

    // กรองตามวันที่
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      results = results.filter(log => new Date(log.timestamp.split(' ')[0]) >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      results = results.filter(log => new Date(log.timestamp.split(' ')[0]) <= toDate);
    }

    setFilteredLogs(results);
  };

  // ฟังก์ชันรีเซ็ตตัวกรอง
  const resetFilters = () => {
    setFilters({
      level: '',
      application: '',
      dateFrom: '',
      dateTo: '',
      source: ''
    });
    setSearchTerm('');
    setFilteredLogs(logs);
  };

  // ฟังก์ชันดูรายละเอียด log
  const viewLogDetail = (log) => {
    setSelectedLog(log);
    setDetailViewOpen(true);
  };

  // รายการแอพพลิเคชันทั้งหมดที่มีใน log
  const applications = [...new Set(logs.map(log => log.application))];
  
  // ระดับความสำคัญที่มีใน log
  const logLevels = ['INFO', 'WARNING', 'ERROR', 'DEBUG'];

  // แหล่งที่มาทั้งหมดที่มีใน log
  const sources = [...new Set(logs.map(log => {
    const parts = log.source.split('.');
    return parts[parts.length - 2] + '.' + parts[parts.length - 1];
  }))];

  // ฟังก์ชันดาวน์โหลด log file
  const downloadLogs = () => {
    // โค้ดสำหรับดาวน์โหลด log file
    console.log('Downloading logs...');
  };

  // ฟังก์ชันลบ log
  const clearLogs = () => {
    // โค้ดสำหรับลบ log
    console.log('Clearing logs...');
  };

  // ฟังก์ชันรีเฟรชข้อมูล
  const refreshLogs = () => {
    // โค้ดสำหรับรีเฟรชข้อมูล
    console.log('Refreshing logs...');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold">ระบบตรวจสอบ Logs</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">ค้นหาและกรอง Logs</h2>
            <div className="flex space-x-2">
              <button 
                className="flex items-center text-blue-600 hover:text-blue-800"
                onClick={refreshLogs}
              >
                <RefreshCw size={16} className="mr-1" />
                รีเฟรช
              </button>
              <button 
                className="flex items-center text-blue-600 hover:text-blue-800"
                onClick={downloadLogs}
              >
                <Download size={16} className="mr-1" />
                ดาวน์โหลด
              </button>
              <button 
                className="flex items-center text-red-600 hover:text-red-800"
                onClick={clearLogs}
              >
                <Trash size={16} className="mr-1" />
                ล้าง Logs
              </button>
              <button 
                className="flex items-center text-blue-600 hover:text-blue-800" 
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter size={16} className="mr-1" />
                {filterOpen ? 'ซ่อนตัวกรอง' : 'แสดงตัวกรอง'}
                {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center border rounded p-2 mb-4">
            <Search size={18} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="ค้นหาข้อความใน logs..." 
              className="w-full focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {filterOpen && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">ระดับความสำคัญ</label>
                <select 
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.level}
                  onChange={(e) => setFilters({...filters, level: e.target.value})}
                >
                  <option value="">ทั้งหมด</option>
                  {logLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">แอพพลิเคชัน</label>
                <select 
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.application}
                  onChange={(e) => setFilters({...filters, application: e.target.value})}
                >
                  <option value="">ทั้งหมด</option>
                  {applications.map(app => (
                    <option key={app} value={app}>{app}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">แหล่งที่มา</label>
                <select 
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.source}
                  onChange={(e) => setFilters({...filters, source: e.target.value})}
                >
                  <option value="">ทั้งหมด</option>
                  {sources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">วันที่เริ่มต้น</label>
                <div className="flex items-center border rounded p-2">
                  <Calendar size={18} className="text-gray-400 mr-2" />
                  <input 
                    type="date" 
                    className="w-full focus:outline-none"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">วันที่สิ้นสุด</label>
                <div className="flex items-center border rounded p-2">
                  <Calendar size={18} className="text-gray-400 mr-2" />
                  <input 
                    type="date" 
                    className="w-full focus:outline-none"
                    value={filters.dateTo}
                    onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 flex items-center"
              onClick={resetFilters}
            >
              <Trash size={16} className="mr-1" />
              ล้างตัวกรอง
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
              onClick={handleSearch}
            >
              <Search size={16} className="mr-1" />
              ค้นหา
            </button>
          </div>
        </div>
        
        {/* Log Results */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              บันทึกการทำงาน ({filteredLogs.length} รายการ)
            </h2>
            <div className="text-sm text-gray-500">
              {filters.level && <span className="mr-2">ระดับ: {filters.level}</span>}
              {filters.application && <span className="mr-2">แอพพลิเคชัน: {filters.application}</span>}
            </div>
          </div>
          
          {/* Log Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เวลา</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ระดับ</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">แอพพลิเคชัน</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thread</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ข้อความ</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-gray-400" />
                        {log.timestamp}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {log.level === 'WARNING' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          <AlertTriangle size={14} className="mr-1" />
                          WARNING
                        </span>
                      )}
                      {log.level === 'INFO' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          <Info size={14} className="mr-1" />
                          INFO
                        </span>
                      )}
                      {log.level === 'ERROR' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          <AlertTriangle size={14} className="mr-1" />
                          ERROR
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Server size={14} className="mr-1 text-gray-400" />
                        {log.application}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {log.thread}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 max-w-lg truncate">
                      {log.message}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                        onClick={() => viewLogDetail(log)}
                      >
                        <FileText size={16} className="mr-1" />
                        รายละเอียด
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-700">
                แสดง <span className="font-medium">1</span> ถึง{' '}
                <span className="font-medium">{filteredLogs.length}</span>{' '}
                จากทั้งหมด <span className="font-medium">{filteredLogs.length}</span> รายการ
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500">
                  ก่อนหน้า
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500">
                  ถัดไป
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
      
      {/* Log Detail Modal */}
      {detailViewOpen && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">รายละเอียด Log</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setDetailViewOpen(false)}
              >
                <ChevronDown size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm text-gray-500">เวลา</h4>
                  <p className="font-medium">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">ระดับ</h4>
                  <p className="font-medium">{selectedLog.level}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">แอพพลิเคชัน</h4>
                  <p className="font-medium">{selectedLog.application}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">Thread</h4>
                  <p className="font-medium">{selectedLog.thread}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm text-gray-500">Source</h4>
                  <p className="font-medium">{selectedLog.source}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm text-gray-500">ข้อความ</h4>
                  <p className="font-medium">{selectedLog.message}</p>
                </div>
              </div>
              
              {selectedLog.stackTrace && (
                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Stack Trace</h4>
                  <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-xs">
                    {selectedLog.stackTrace}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogDashboard;