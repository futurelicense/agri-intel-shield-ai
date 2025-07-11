
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Bell, Check, X, Clock, Zap } from 'lucide-react';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'High Pest Activity Detected',
      message: 'Aphid population above threshold in Field A. Immediate action recommended.',
      timestamp: '2 hours ago',
      severity: 'high',
      acknowledged: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Weather Update',
      message: 'Heavy rain expected tomorrow. Adjust irrigation schedule accordingly.',
      timestamp: '4 hours ago',
      severity: 'medium',
      acknowledged: false
    },
    {
      id: 3,
      type: 'success',
      title: 'NDVI Improvement',
      message: 'Crop health index improved by 15% in the monitored area.',
      timestamp: '1 day ago',
      severity: 'low',
      acknowledged: true
    },
    {
      id: 4,
      type: 'critical',
      title: 'Soil Moisture Critical',
      message: 'Soil moisture dropped below 30% in Field B. Immediate irrigation required.',
      timestamp: '6 hours ago',
      severity: 'critical',
      acknowledged: false
    }
  ]);

  const getAlertIcon = (type: string, severity: string) => {
    if (severity === 'critical') return <Zap className="h-4 w-4 text-red-600" />;
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'success': return <Check className="h-4 w-4 text-green-600" />;
      default: return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  const getAlertColor = (severity: string, acknowledged: boolean) => {
    if (acknowledged) return 'bg-gray-50 border-gray-200';
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return <Badge className="bg-red-600 text-white">Critical</Badge>;
      case 'high': return <Badge className="bg-orange-600 text-white">High</Badge>;
      case 'medium': return <Badge className="bg-yellow-600 text-white">Medium</Badge>;
      default: return <Badge className="bg-blue-600 text-white">Low</Badge>;
    }
  };

  const acknowledgeAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const unacknowledgedCount = alerts.filter(alert => !alert.acknowledged).length;
  const criticalCount = alerts.filter(alert => alert.severity === 'critical' && !alert.acknowledged).length;

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-600" />
            <span>Active Alerts</span>
          </div>
          <div className="flex space-x-2">
            {criticalCount > 0 && (
              <Badge className="bg-red-600 text-white animate-pulse">
                {criticalCount} Critical
              </Badge>
            )}
            <Badge variant="outline">
              {unacknowledgedCount} New
            </Badge>
          </div>
        </CardTitle>
        <CardDescription>
          Real-time farm monitoring alerts and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Check className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p className="text-sm">No active alerts</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${getAlertColor(alert.severity, alert.acknowledged)} ${
                    alert.acknowledged ? 'opacity-70' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getAlertIcon(alert.type, alert.severity)}
                      <span className="font-medium text-sm text-gray-900">
                        {alert.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSeverityBadge(alert.severity)}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-700 mb-3">{alert.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                    
                    {!alert.acknowledged && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="h-7 px-2 text-xs"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Ack
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => dismissAlert(alert.id)}
                          className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        {unacknowledgedCount > 0 && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-amber-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">
                {unacknowledgedCount} alert{unacknowledgedCount > 1 ? 's' : ''} require{unacknowledgedCount === 1 ? 's' : ''} attention
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
