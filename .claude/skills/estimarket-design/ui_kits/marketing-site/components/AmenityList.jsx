// Map a human amenity label to the closest Lucide icon
const amenityIcon = {
  'Wifi': 'wifi',
  'Hot tub': 'bath',
  'Pool': 'waves',
  'Cenote access': 'waves',
  'Fireplace': 'flame',
  'Kitchen': 'utensils',
  'Chef kitchen': 'chef-hat',
  'Ski-in/ski-out': 'mountain-snow',
  'Ski room': 'mountain-snow',
  'Free parking': 'parking-circle',
  'Heating': 'thermometer-sun',
  'Heated floors': 'thermometer-sun',
  'Washer': 'shirt',
  'Dryer': 'wind',
  'Coffee maker': 'coffee',
  'Beach access': 'umbrella',
  'Beach gear': 'umbrella',
  'Surfboards': 'waves',
  'Outdoor shower': 'shower-head',
  'BBQ grill': 'flame',
  'Workspace': 'monitor',
  'Garden': 'leaf',
  'Pets allowed': 'paw-print',
  'Hammock': 'tent-tree',
  'Bikes': 'bike',
  'Yoga deck': 'flower',
  'Ceiling fans': 'fan',
  'EV charger': 'plug',
};

function AmenityList({ amenities }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, columnGap: 32 }}>
      {amenities.map(a => (
        <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'var(--color-text-secondary)', padding: '6px 0' }}>
          <Icon name={amenityIcon[a] || 'check'} size={20} stroke={1.8} style={{ color: 'var(--color-text-primary)' }} />
          {a}
        </div>
      ))}
    </div>
  );
}

window.AmenityList = AmenityList;
