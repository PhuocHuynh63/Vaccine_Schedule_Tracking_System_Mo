declare module 'react-native-calendar-picker' {
    import { ComponentType } from 'react';
    import { ViewStyle } from 'react-native';
  
    export interface CalendarPickerProps {
      onDateChange: (date: Date) => void;
      selectedDayColor?: string;
      selectedDayTextColor?: string;
      todayBackgroundColor?: string;
      todayTextStyle?: any;
      minDate?: Date;
      maxDate?: Date;
      previousComponent?: React.ReactNode;
      nextComponent?: React.ReactNode;
      textStyle?: any;
      selectedStartDate?: Date | null | undefined; // Thêm null vào kiểu
    }
  
    const CalendarPicker: ComponentType<CalendarPickerProps>;
    export default CalendarPicker;
  }