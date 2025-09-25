// Device shapes and configurations
const DEVICES = {
    'Jump Drive': {
        'Default': {
            name: 'Default',
            shape: [
                ['X', 'X'],
                ['X', ' ']
            ],
            color: '#FF6B6B'
        }
    },
    'Sensors': {
        'Sector Scanner Mk1': {
            name: 'Sector Scanner Mk1',
            shape: [
                ['X', 'X']
            ],
            color: '#7FDBDA'
        },
        'Supply Uplink Unit Mk1': {
            name: 'Supply Uplink Unit Mk1',
            shape: [
                [' ', 'X', 'X'],
                ['X', 'X', ' ']
            ],
            color: '#7FDBDA'
        },
        'Vector Targeting Module Mk1': {
            name: 'Vector Targeting Module Mk1',
            shape: [
                ['X', 'X', 'X'],
                ['X', ' ', ' ']
            ],
            color: '#7FDBDA'
        }
    },
    'Engine': {
        'Drift Phase Engine Mk1': {
            name: 'Drift Phase Engine Mk1',
            shape: [
                ['X', 'X', 'X']
            ],
            color: '#45B7D1'
        },
        'Drift Phase Engine Mk2': {
            name: 'Drift Phase Engine Mk2',
            shape: [
                ['X', 'X', 'X']
            ],
            color: '#45B7D1'
        },
        'Drift Phase Engine Mk3': {
            name: 'Drift Phase Engine Mk3',
            shape: [
                ['X', 'X', 'X']
            ],
            color: '#45B7D1'
        },
        'Nitro Pulse Engine Mk1': {
            name: 'Nitro Pulse Engine Mk1',
            shape: [
                ['X', 'X', 'X', 'X']
            ],
            color: '#45B7D1'
        },
        'Nitro Pulse Engine Mk2': {
            name: 'Nitro Pulse Engine Mk2',
            shape: [
                ['X', 'X', 'X', 'X']
            ],
            color: '#45B7D1'
        },
        'Nitro Pulse Engine Mk3': {
            name: 'Nitro Pulse Engine Mk3',
            shape: [
                ['X', 'X', 'X', 'X']
            ],
            color: '#45B7D1'
        },
        'Microplasma Engine Mk1': {
            name: 'Microplasma Engine Mk1',
            shape: [
                ['X']
            ],
            color: '#45B7D1'
        },
        'Microplasma Engine Mk2': {
            name: 'Microplasma Engine Mk2',
            shape: [
                ['X']
            ],
            color: '#45B7D1'
        },
        'Microplasma Engine Mk3': {
            name: 'Microplasma Engine Mk3',
            shape: [
                ['X']
            ],
            color: '#45B7D1'
        },
        'Mass Ejector Engine Mk1': {
            name: 'Mass Ejector Engine Mk1',
            shape: [
                ['X', 'X', 'X']
            ],
            color: '#45B7D1'
        },
        'Mass Ejector Engine Mk2': {
            name: 'Mass Ejector Engine Mk2',
            shape: [
                ['X', 'X', 'X']
            ],
            color: '#45B7D1'
        },
        'Mass Ejector Engine Mk3': {
            name: 'Mass Ejector Engine Mk3',
            shape: [
                ['X', 'X', 'X']
            ],
            color: '#45B7D1'
        }
    },
    'Pilot Weapon': {
        'Fragment Cannon Mk1': {
            name: 'Fragment Cannon Mk1',
            shape: [
                ['X', 'X', 'X'],
                [' ', 'X', ' ']
            ],
            color: '#F7DC6F'
        },
        'Fragment Cannon Mk2': {
            name: 'Fragment Cannon Mk2',
            shape: [
                ['X', 'X', 'X'],
                [' ', 'X', ' ']
            ],
            color: '#F7DC6F'
        },
        'Fragment Cannon Mk3': {
            name: 'Fragment Cannon Mk3',
            shape: [
                ['X', 'X', 'X'],
                [' ', 'X', ' ']
            ],
            color: '#F7DC6F'
        },
        'Disruptor Laser Mk1': {
            name: 'Disruptor Laser Mk1',
            shape: [
                ['X', 'X'],
                ['X', ' ']
            ],
            color: '#F7DC6F'
        },
        'Disruptor Laser Mk2': {
            name: 'Disruptor Laser Mk2',
            shape: [
                ['X', 'X'],
                ['X', ' ']
            ],
            color: '#F7DC6F'
        },
        'Disruptor Laser Mk3': {
            name: 'Disruptor Laser Mk3',
            shape: [
                ['X', 'X']
            ],
            color: '#F7DC6F'
        },
        'Rapid Pulse Cannon Mk1': {
            name: 'Rapid Pulse Cannon Mk1',
            shape: [
                ['X', 'X', 'X'],
                ['X', 'X', 'X']
            ],
            color: '#F7DC6F'
        },
        'Rapid Pulse Cannon Mk2': {
            name: 'Rapid Pulse Cannon Mk2',
            shape: [
                ['X', 'X', 'X'],
                ['X', 'X', 'X']
            ],
            color: '#F7DC6F'
        },
        'Rapid Pulse Cannon Mk3': {
            name: 'Rapid Pulse Cannon Mk3',
            shape: [
                ['X', 'X', 'X'],
                ['X', 'X', 'X']
            ],
            color: '#F7DC6F'
        },
        'Bolt Accellerator Mk1': {
            name: 'Bolt Accellerator Mk1',
            shape: [
                ['X', 'X', 'X'],
                ['X', ' ', 'X']
            ],
            color: '#F7DC6F'
        },
        'Bolt Accellerator Mk2': {
            name: 'Bolt Accellerator Mk2',
            shape: [
                ['X', 'X', 'X'],
                ['X', ' ', 'X']
            ],
            color: '#F7DC6F'
        },
        'Bolt Accellerator Mk3': {
            name: 'Bolt Accellerator Mk3',
            shape: [
                ['X', 'X', 'X'],
                ['X', ' ', 'X']
            ],
            color: '#F7DC6F'
        },
        '-Empty-': {
            name: '-Empty-',
            shape: [],
            color: '#FFFFFF'
        }
    },
    'Multi Turrets': {
        'Assault Turrets Mk1': {
            name: 'Assault Turrets Mk1',
            shape: [
                ['X', 'X', 'X'],
                ['X', ' ', ' ']
            ],
            color: '#85C1E9'
        },
        'Assault Turrets Mk2': {
            name: 'Assault Turrets Mk2',
            shape: [
                ['X', 'X', 'X'],
                ['X', ' ', ' ']
            ],
            color: '#85C1E9'
        },
        'Assault Turrets Mk3': {
            name: 'Assault Turrets Mk3',
            shape: [
                ['X', 'X', 'X'],
                ['X', ' ', ' ']
            ],
            color: '#85C1E9'
        },
        'Gatling Turrets Mk1': {
            name: 'Gatling Turrets Mk1',
            shape: [
                ['X', 'X', 'X'],
                ['X', 'X', 'X'],
                ['X', ' ', ' ']
            ],
            color: '#85C1E9'
        },
        'Gatling Turrets Mk2': {
            name: 'Gatling Turrets Mk2',
            shape: [
                ['X', 'X', 'X'],
                ['X', 'X', 'X'],
                ['X', ' ', ' ']
            ],
            color: '#85C1E9'
        },
        'Gatling Turrets Mk3': {
            name: 'Gatling Turrets Mk3',
            shape: [
                ['X', 'X', 'X'],
                ['X', 'X', 'X'],
                ['X', ' ', ' ']
            ],
            color: '#85C1E9'
        },
        'Flak Launcher Turrets Mk1': {
            name: 'Flak Launcher Turrets Mk1',
            shape: [
                ['X', 'X', 'X', 'X'],
                ['X', ' ', ' ', 'X']
            ],
            color: '#85C1E9'
        },
        'Flak Launcher Turrets Mk2': {
            name: 'Flak Launcher Turrets Mk2',
            shape: [
                ['X', 'X', 'X', 'X'],
                ['X', ' ', ' ', 'X']
            ],
            color: '#85C1E9'
        },
        'Flak Launcher Turrets Mk3': {
            name: 'Flak Launcher Turrets Mk3',
            shape: [
                ['X', 'X', 'X', 'X'],
                ['X', ' ', ' ', 'X']
            ],
            color: '#85C1E9'
        },
        'Mining Lasers Mk1': {
            name: 'Mining Lasers Mk1',
            shape: [
                ['X', 'X'],
                ['X', ' ']
            ],
            color: '#85C1E9'
        },
        'Mining Lasers Mk2': {
            name: 'Mining Lasers Mk2',
            shape: [
                ['X', 'X'],
                ['X', ' ']
            ],
            color: '#85C1E9'
        },
        'Mining Lasers Mk3': {
            name: 'Mining Lasers Mk3',
            shape: [
                ['X', 'X'],
                ['X', ' ']
            ],
            color: '#85C1E9'
        },
        '-Empty-': {
            name: '-Empty-',
            shape: [],
            color: '#FFFFFF'
        }
    },
    'Special Weapon': {
        'Lance Railgun Mk1': {
            name: 'Lance Railgun Mk1',
            shape: [
                ['X', 'X', 'X'],
                ['X', ' ', 'X'],
                ['X', ' ', 'X']
            ],
            color: '#F8C471'
        },
        'Lance Railgun Mk2': {
            name: 'Lance Railgun Mk2',
            shape: [
                ['X', 'X', 'X'],
                ['X', ' ', 'X'],
                ['X', ' ', 'X']
            ],
            color: '#F8C471'
        },
        'Lance Railgun Mk3': {
            name: 'Lance Railgun Mk3',
            shape: [
                ['X', 'X', 'X'],
                ['X', ' ', 'X'],
                ['X', ' ', 'X']
            ],
            color: '#F8C471'
        },
        'Burst Shield Mk1': {
            name: 'Burst Shield Mk1',
            shape: [
                ['X', 'X'],
                ['X', 'X']
            ],
            color: '#F8C471'
        },
        'Burst Shield Mk2': {
            name: 'Burst Shield Mk2',
            shape: [
                ['X', 'X'],
                ['X', 'X']
            ],
            color: '#F8C471'
        },
        'Burst Shield Mk3': {
            name: 'Burst Shield Mk3',
            shape: [
                ['X', 'X'],
                ['X', 'X']
            ],
            color: '#F8C471'
        },
        'Misisle Launcher Mk1': {
            name: 'Misisle Launcher Mk1',
            shape: [
                ['X', 'X', 'X'],
                ['X', 'X', 'X'],
                ['X', 'X', 'X']
            ],
            color: '#F8C471'
        },
        'Misisle Launcher Mk2': {
            name: 'Misisle Launcher Mk2',
            shape: [
                ['X', 'X', 'X'],
                ['X', 'X', 'X'],
                ['X', 'X', 'X']
            ],
            color: '#F8C471'
        },
        'Misisle Launcher Mk3': {
            name: 'Misisle Launcher Mk3',
            shape: [
                ['X', 'X', 'X'],
                ['X', 'X', 'X'],
                ['X', 'X', 'X']
            ],
            color: '#F8C471'
        },
        'Targeting Module Mk1': {
            name: 'Targeting Module Mk1',
            shape: [
                ['X', 'X']
            ],
            color: '#F8C471'
        },
        'Targeting Module Mk2': {
            name: 'Targeting Module Mk2',
            shape: [
                ['X', 'X']
            ],
            color: '#F8C471'
        },
        'Targeting Module Mk3': {
            name: 'Targeting Module Mk3',
            shape: [
                ['X', 'X']
            ],
            color: '#F8C471'
        },
        '-Empty-': {
            name: '-Empty-',
            shape: [],
            color: '#FFFFFF'
        }
    }
};

// Ship configurations
const SHIPS = {
    'Catamaran': {
        name: 'Catamaran',
        allowedDevices: ['Jump Drive', 'Sensors', 'Engine', 'Pilot Weapon A', 'Multi Turrets', 'Special Weapon A', 'Special Weapon B']
    },
    'Dart': {
        name: 'Dart',
        allowedDevices: ['Jump Drive', 'Sensors', 'Engine', 'Pilot Weapon A', 'Pilot Weapon B', 'Special Weapon A']
    }
};
