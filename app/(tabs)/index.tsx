import { Image, StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const getDate = () => {
  const dateObj = new Date();
  const paddedDay = dateObj.getDate().toString().padStart(2, "0");
  const paddedMonth = (dateObj.getMonth() + 1).toString().padStart(2,"0")
  const date = dateObj.getFullYear() + '-' + paddedMonth + '-' + paddedDay;
  return date;
}

const Target:string = '20-03-2025';

export default function HomeScreen() {
  const [time,setTime] = useState<string>('');

  useEffect(() => {
    const date = getDate();
    const currentDate:any = new Date(date);

    // Parse Target string to a valid date
    const [day, month, year] = Target.split('-').map(Number);
    const targetDate = new Date(year, month - 1, day); // month is zero-based

    const differenceInMilliseconds = targetDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    const months = Math.floor(differenceInDays / 30.44); // Approximate average days in a month
    const days = Math.round(differenceInDays % 30.44);

    // Update the time state
    setTime(`${months} months and ${days} days`);
  },[])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome Pranit!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Countdown to Exam</ThemedText>
        <ThemedText>
          <ThemedText type="subtitle">{time}</ThemedText> to E-Day
        </ThemedText>
      </ThemedView>
      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
