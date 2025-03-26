import React, { useState, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';

const DateTimeField = ({ title, handleChange, otherStyles }) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');

    const dayInputRef = useRef(null);
    const monthInputRef = useRef(null);
    const yearInputRef = useRef(null);
    const hourInputRef = useRef(null);
    const minuteInputRef = useRef(null);

    const [isDateFocused, setIsDateFocused] = useState(false);
    const [isTimeFocused, setIsTimeFocused] = useState(false);

    const handleInputChange = (value, setField, max, maxLength, nextRef) => {
        let cleanedValue = value.replace(/\D/g, '');
        if (cleanedValue.length > 0) {
            const num = parseInt(cleanedValue, 10);
            cleanedValue = num > max ? max.toString() : cleanedValue;
        }
        setField(cleanedValue);

        // Quando todos os campos de data e hora forem preenchidos
        if (day.length === 2 && month.length === 2 && year.length === 4 && hour.length === 2 && minute.length === 2) {
            const date = new Date(year, month - 1, day, hour, minute);

            // Se a data criada for válida, passe para o handleChange
            if (!isNaN(date)) {
                handleChange(date);
            }
        }

        if (cleanedValue.length === maxLength && nextRef) {
            nextRef.current.focus();
        }
    };

    const handleDelete = (value, setField, prevRef, prevSetField) => {
        if (value.length === 0 && prevRef) {
            prevSetField(prev => prev.slice(0, -1));
            prevRef.current.focus();
        } else {
            setField(value.slice(0, -1));
        }
    };

    return (
        <View className={`space-y-4 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

            <View className={`mt-2 border-2 w-full h-16 px-4 bg-gray-700 rounded-2xl ${isDateFocused ? "border-secondary" : "border-gray-600"} items-center flex-row`}>
                <TextInput
                    onFocus={() => setIsDateFocused(true)}
                    onBlur={() => setIsDateFocused(false)}
                    ref={dayInputRef}
                    className="text-white text-base text-center flex-1"
                    placeholder="Dia"
                    placeholderTextColor="#7b7b8b"
                    value={day}
                    onChangeText={(text) => handleInputChange(text, setDay, 31, 2, monthInputRef)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key === 'Backspace' && handleDelete(day, setDay, null, null)}
                    keyboardType="numeric"
                    maxLength={2}
                    autoFocus
                />
                <Text className={`${isDateFocused ? "text-secondary" : "text-gray-600"} text-xl mx-2`}>/</Text>
                <TextInput
                    onFocus={() => setIsDateFocused(true)}
                    onBlur={() => setIsDateFocused(false)}
                    ref={monthInputRef}
                    className="text-white text-base text-center flex-1"
                    placeholder="Mês"
                    placeholderTextColor="#7b7b8b"
                    value={month}
                    onChangeText={(text) => handleInputChange(text, setMonth, 12, 2, yearInputRef)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key === 'Backspace' && handleDelete(month, setMonth, dayInputRef, setDay)}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <Text className={`${isDateFocused ? "text-secondary" : "text-gray-600"} text-xl mx-2`}>/</Text>
                <TextInput
                    onFocus={() => setIsDateFocused(true)}
                    onBlur={() => setIsDateFocused(false)}
                    ref={yearInputRef}
                    className="text-white text-base text-center flex-1"
                    placeholder="Ano"
                    placeholderTextColor="#7b7b8b"
                    value={year}
                    onChangeText={(text) => handleInputChange(text, setYear, 9999, 4, hourInputRef)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key === 'Backspace' && handleDelete(year, setYear, monthInputRef, setMonth)}
                    keyboardType="numeric"
                    maxLength={4}
                />
            </View>

            <View className={`mt-6 border-2 w-full h-16 px-4 bg-gray-700 rounded-2xl ${isTimeFocused ? "border-secondary" : "border-gray-600"} items-center flex-row`}>
                <TextInput
                    onFocus={() => setIsTimeFocused(true)}
                    onBlur={() => setIsTimeFocused(false)}
                    ref={hourInputRef}
                    className="text-white text-base text-center flex-1"
                    placeholder="Hora"
                    placeholderTextColor="#7b7b8b"
                    value={hour}
                    onChangeText={(text) => handleInputChange(text, setHour, 23, 2, minuteInputRef)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key === 'Backspace' && handleDelete(hour, setHour, yearInputRef, setYear)}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <Text className={`${isTimeFocused ? "text-secondary" : "text-gray-600"} text-xl mx-2`}>:</Text>
                <TextInput
                    onFocus={() => setIsTimeFocused(true)}
                    onBlur={() => setIsTimeFocused(false)}
                    ref={minuteInputRef}
                    className="text-white text-base text-center flex-1"
                    placeholder="Minuto"
                    placeholderTextColor="#7b7b8b"
                    value={minute}
                    onChangeText={(text) => handleInputChange(text, setMinute, 59, 2, null)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key === 'Backspace' && handleDelete(minute, setMinute, hourInputRef, setHour)}
                    keyboardType="numeric"
                    maxLength={2}
                />
            </View>
        </View>
    );
};

export default DateTimeField;
