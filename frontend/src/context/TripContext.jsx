import { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_STOPS, INITIAL_TRAVEL, INITIAL_HOTEL, INITIAL_ACTIVITIES } from '../data/mockItineraryItems';

const TripContext = createContext();

export function TripProvider({ children }) {
  const [tripState, setTripState] = useState({
    fromCity: 'Mumbai',
    toCity: 'Goa',
    startDate: '2026-09-01',
    endDate: '2026-09-05',
    selectedRental: null,
  });

  const [activeTab, setActiveTab] = useState('home');
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);

  // Multi-city stops state
  const [stops, setStops] = useState(INITIAL_STOPS);

  // Itinerary items state
  const [itineraryItems, setItineraryItems] = useState([
    INITIAL_TRAVEL,
    INITIAL_HOTEL,
    ...INITIAL_ACTIVITIES,
  ]);

  const updateTrip = (newDetails) => {
    setTripState((prev) => ({
      ...prev,
      ...newDetails,
    }));
  };

  const setSelectedRental = (rental) => {
    setTripState((prev) => ({
      ...prev,
      selectedRental: rental,
    }));
  };

  const clearSelectedRental = () => {
    setTripState((prev) => ({
      ...prev,
      selectedRental: null,
    }));
  };

  // Add a new multi-city stop
  const addStop = (newStop) => {
    setStops((prev) => [...prev, { ...newStop, id: `stop-${Date.now()}` }]);
  };

  // Remove a stop
  const removeStop = (stopId) => {
    setStops((prev) => prev.filter((s) => s.id !== stopId));
  };

  // Add custom activity item
  const addActivity = (activity) => {
    const newItem = {
      ...activity,
      id: `act-${Date.now()}`,
    };
    setItineraryItems((prev) => [...prev, newItem]);
  };

  // Remove activity item
  const removeActivity = (itemId) => {
    setItineraryItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Move activity up or down within a day
  const moveActivityInDay = (dayNum, itemId, direction) => {
    setItineraryItems((prev) => {
      const dayItems = prev.filter((item) => item.dayNum === dayNum);
      const otherItems = prev.filter((item) => item.dayNum !== dayNum);
      
      const index = dayItems.findIndex((item) => item.id === itemId);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= dayItems.length) return prev;

      // Swap items
      const newDayItems = [...dayItems];
      const temp = newDayItems[index];
      newDayItems[index] = newDayItems[targetIndex];
      newDayItems[targetIndex] = temp;

      return [...otherItems, ...newDayItems];
    });
  };

  // Reassign activity to another day
  const reassignActivityDay = (itemId, targetDayNum) => {
    setItineraryItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, dayNum: Number(targetDayNum) } : item
      )
    );
  };

  // Calculate day-wise schedule structure
  const itineraryDays = useMemo(() => {
    // Generate dates between startDate and endDate
    const days = [];
    const start = new Date(tripState.startDate || '2026-09-01');
    const end = new Date(tripState.endDate || '2026-09-05');
    
    // Calculate total days
    const totalDaysCount = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

    for (let i = 1; i <= totalDaysCount; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + (i - 1));
      const dateStr = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      // Find matching city stop if any
      const matchingStop = stops.find((s) => {
        const sStart = new Date(s.startDate);
        const sEnd = new Date(s.endDate);
        return currentDate >= sStart && currentDate <= sEnd;
      });

      const dayCity = matchingStop ? matchingStop.city : tripState.toCity || 'Destination';

      // Collect items for this day
      const dayItems = itineraryItems.filter((item) => item.dayNum === i);

      // Auto-populate rental if selected and assigned
      if (tripState.selectedRental) {
        const hasRentalItem = dayItems.some((item) => item.category === 'Rental');
        if (!hasRentalItem && i >= 1 && i <= totalDaysCount) {
          dayItems.push({
            id: `rental-autodag-${i}`,
            category: 'Rental',
            title: `Local Transport: ${tripState.selectedRental.model}`,
            provider: tripState.selectedRental.provider,
            cost: tripState.selectedRental.pricePerDay,
            time: 'All Day Commute',
            location: tripState.selectedRental.pickupLocation,
            dayNum: i,
            notes: `Fuel: ${tripState.selectedRental.fuelType}. Pickup at ${tripState.selectedRental.pickupLocation}`,
            isAutoRental: true,
          });
        }
      }

      days.push({
        dayNum: i,
        date: dateStr,
        city: dayCity,
        items: dayItems,
      });
    }

    return days;
  }, [tripState.startDate, tripState.endDate, tripState.toCity, tripState.selectedRental, stops, itineraryItems]);

  return (
    <TripContext.Provider
      value={{
        tripState,
        updateTrip,
        setSelectedRental,
        clearSelectedRental,
        activeTab,
        setActiveTab,
        isItineraryOpen,
        setIsItineraryOpen,
        stops,
        addStop,
        removeStop,
        itineraryItems,
        itineraryDays,
        addActivity,
        removeActivity,
        moveActivityInDay,
        reassignActivityDay,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
