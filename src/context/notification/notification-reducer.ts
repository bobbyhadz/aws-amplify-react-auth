import type {NotificationAttrs} from '@components/notification';

type NotificationState = NotificationAttrs[];

export enum ActionType {
  ADD_NOTIFICATION = 'add_notification',
  REMOVE_NOTIFICATION = 'remove_notification',
}

export type Action =
  | {
      type: ActionType.ADD_NOTIFICATION;
      notification: Pick<
        NotificationAttrs,
        'type' | 'title' | 'message' | 'closeNotificationMs'
      >;
    }
  | {
      type: ActionType.REMOVE_NOTIFICATION;
      notification: {id: string};
    };

export function notificationReducer(
  state: NotificationState,
  action: Action,
): NotificationState {
  switch (action.type) {
    case ActionType.ADD_NOTIFICATION: {
      return [
        ...state,
        {id: `${Math.random()}_${Date.now()}`, ...action.notification},
      ];
    }
    case ActionType.REMOVE_NOTIFICATION: {
      return state.filter(
        notification => notification.id !== action.notification.id,
      );
    }
    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
    }
  }
}
