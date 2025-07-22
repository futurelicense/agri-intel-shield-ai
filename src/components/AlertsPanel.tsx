
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
    if (severity === 'critical') return <Zap className="h-5 w-5 text-destructive animate-pulse" />;
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'success': return <Check className="h-5 w-5 text-emerald-500" />;
      default: return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const getAlertColor = (severity: string, acknowledged: boolean) => {
    if (acknowledged) return 'bg-muted/30 border-border shadow-sm';
    switch (severity) {
      case 'critical': return 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 shadow-md shadow-red-100/50 animate-pulse';
      case 'high': return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 shadow-md shadow-orange-100/50';
      case 'medium': return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 shadow-sm shadow-yellow-100/50';
      default: return 'bg-gradient-to-r from-blue-50 to-blue-100 border-primary/20 shadow-sm shadow-primary/10';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return <Badge variant="destructive" className="animate-pulse shadow-sm">Critical</Badge>;
      case 'high': return <Badge className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">High</Badge>;
      case 'medium': return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm">Medium</Badge>;
      default: return <Badge variant="secondary" className="shadow-sm">Low</Badge>;
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
    <Card className="bg-gradient-to-br from-card to-card/95 backdrop-blur-sm border-border/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-md">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-foreground">Active Alerts</span>
          </div>
          <div className="flex space-x-2">
            {criticalCount > 0 && (
              <Badge variant="destructive" className="animate-pulse shadow-md px-3 py-1">
                {criticalCount} Critical
              </Badge>
            )}
            <Badge variant="outline" className="px-3 py-1 shadow-sm">
              {unacknowledgedCount} New
            </Badge>
          </div>
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
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
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${getAlertColor(alert.severity, alert.acknowledged)} ${
                    alert.acknowledged ? 'opacity-60' : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-background/80 rounded-lg shadow-sm">
                        {getAlertIcon(alert.type, alert.severity)}
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-foreground leading-tight">
                          {alert.title}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSeverityBadge(alert.severity)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed pl-12">
                    {alert.message}
                  </p>
                  
                  <div className="flex items-center justify-between pl-12">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                    
                    {!alert.acknowledged && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="h-8 px-3 text-xs hover:scale-105 transition-transform shadow-sm"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Acknowledge
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => dismissAlert(alert.id)}
                          className="h-8 px-3 text-xs text-destructive hover:text-destructive hover:scale-105 transition-transform shadow-sm"
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
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3 text-sm text-amber-800">
              <div className="p-1 bg-amber-100 rounded-lg">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <span className="font-semibold">
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
