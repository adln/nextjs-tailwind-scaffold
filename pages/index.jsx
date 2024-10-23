import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

 function Index() {
  return (
    <div>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>KPI 1</CardTitle>
          </CardHeader>
          <CardContent>
            <h3>25000 DA</h3>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>KPI 1</CardTitle>
          </CardHeader>
          <CardContent>
            <h3>25000 DA</h3>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>KPI 1</CardTitle>
          </CardHeader>
          <CardContent>
            <h3>25000 DA</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

Index.title = "Dashboard";

export default Index;