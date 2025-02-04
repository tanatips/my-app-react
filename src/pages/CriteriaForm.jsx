import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const CriteriaForm = () => {
  const [formData, setFormData] = useState({
    startMonth: '',
    endMonth: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      startMonth: '',
      endMonth: ''
    });
  };

  const months = [
    { value: '01', label: 'มกราคม' },
    { value: '02', label: 'กุมภาพันธ์' },
    { value: '03', label: 'มีนาคม' },
    { value: '04', label: 'เมษายน' },
    { value: '05', label: 'พฤษภาคม' },
    { value: '06', label: 'มิถุนายน' },
    { value: '07', label: 'กรกฎาคม' },
    { value: '08', label: 'สิงหาคม' },
    { value: '09', label: 'กันยายน' },
    { value: '10', label: 'ตุลาคม' },
    { value: '11', label: 'พฤศจิกายน' },
    { value: '12', label: 'ธันวาคม' }
  ];

return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
            <CardTitle>รายงานการเปลี่ยนแปลงพนักงาน</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-end space-x-4">
                    <div className="space-y-2 flex-1">
                        <Label htmlFor="startMonth">เดือนเริ่มต้น</Label>
                        <Select value={formData.startMonth} onValueChange={(value) => setFormData(prev => ({ ...prev, startMonth: value }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="เลือกเดือน" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((month) => (
                                    <SelectItem key={month.value} value={month.value}>
                                        {month.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 flex-1">
                        <Label htmlFor="endMonth">เดือนสิ้นสุด</Label>
                        <Select value={formData.endMonth} onValueChange={(value) => setFormData(prev => ({ ...prev, endMonth: value }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="เลือกเดือน" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((month) => (
                                    <SelectItem key={month.value} value={month.value}>
                                        {month.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex space-x-2">
                        <Button type="button" variant="outline" onClick={handleReset}>
                            ล้างค่า
                        </Button>
                        <Button type="submit">
                            ค้นหา
                        </Button>
                    </div>
                </div>
            </form>
        </CardContent>
    </Card>
);
};

export default CriteriaForm;