import { useState } from 'react';
import { Icon, IconButton } from '../ui';

export function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications: any[] = [];
  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <IconButton
        icon="notifications"
        size="md"
        badge={unreadCount}
        onClick={() => setShowNotifications(!showNotifications)}
        className="hover:text-primary transition-colors"
      />

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-surface border-2 border-outline-variant/50 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b-2 border-outline-variant/30 bg-gradient-to-r from-surface-container/50 to-surface-container-high/50">
            <p className="font-semibold text-on-surface flex items-center gap-2">
              <div className="text-primary">
                <Icon name="notifications_active" size="md" />
              </div>
              Notifications
            </p>
          </div>
          {notifications.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notif: any) => (
                <div
                  key={notif.id}
                  className="px-4 py-3 border-b border-outline-variant/30 hover:bg-surface-container/50 transition-colors cursor-pointer group"
                >
                  <p className="text-sm text-on-surface group-hover:text-primary transition-colors">
                    {notif.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <div className="inline-block opacity-50 mb-2 p-3 rounded-full bg-on-surface-variant/10">
                <Icon name="notifications_none" size="lg" />
              </div>
              <p className="text-sm font-medium text-on-surface">No notifications</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
