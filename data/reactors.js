// Reactor configurations
const REACTORS = {
    'Split Reactor Mk1': {
        name: 'Split Reactor Mk1',
        pattern: [
            ['O', 'O', '-', '-', '-', '-', 'O', 'O'],
            ['O', 'O', 'O', '-', '-', 'O', 'O', 'O'],
            ['O', 'O', 'O', '-', '-', 'O', 'O', 'O'],
            ['O', 'O', 'O', '-', '-', 'O', 'O', 'O']
        ]
    },
    'Split Reactor Mk2': {
        name: 'Split Reactor Mk2',
        pattern: [
            ['O', 'O', '-', '-', '-', '-', 'O', 'O'],
            ['O', 'O', 'O', '-', '-', 'O', 'O', 'O'],
            ['+', 'O', 'O', '-', '-', 'O', 'O', '+'],
            ['+', 'O', 'O', '-', '-', 'O', 'O', '+']
        ]
    },
    'Split Reactor Mk3': {
        name: 'Split Reactor Mk3',
        pattern: [
            ['O', 'O', '-', '-', '-', '-', 'O', 'O'],
            ['O', 'O', 'O', '-', '-', 'O', 'O', 'O'],
            ['+', '+', 'O', '-', '-', 'O', '+', '+'],
            ['+', '+', 'O', '-', '-', 'O', '+', '+']
        ]
    },
    'Solid State Reactor Mk1': {
        name: 'Solid State Reactor Mk1',
        pattern: [
            ['-', '-', 'O', 'O', 'O', 'O', '-', '-'],
            ['-', '-', 'O', 'O', 'O', 'O', '-', '-'],
            ['-', '-', '+', '+', '+', '+', '-', '-'],
            ['-', '-', '+', '+', '+', '+', '-', '-']
        ]
    },
    'Solid State Reactor Mk2': {
        name: 'Solid State Reactor Mk2',
        pattern: [
            ['-', '-', 'O', 'O', 'O', 'O', '-', '-'],
            ['-', '-', '+', '+', '+', '+', '-', '-'],
            ['-', '-', '+', '+', '+', '+', '-', '-'],
            ['-', '-', '+', '+', '+', '+', '-', '-']
        ]
    },
    'Solid State Reactor Mk3': {
        name: 'Solid State Reactor Mk3',
        pattern: [
            ['-', '-', '+', '+', '+', '+', '-', '-'],
            ['-', '-', '+', '+', '+', '+', '-', '-'],
            ['-', '-', '+', '+', '+', '+', '-', '-'],
            ['-', '-', '+', '+', '+', '+', '-', '-']
        ]
    },
    'Materia Scatter Reacotr Mk1': {
        name: 'Materia Scatter Reacotr Mk1',
        pattern: [
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['-', 'O', '-', 'O', 'O', '-', 'O', '-'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['+', '-', '+', '-', '-', '+', '-', '+']
        ]
    },
    'Materia Scatter Reacotr Mk2': {
        name: 'Materia Scatter Reacotr Mk2',
        pattern: [
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['-', 'O', '-', 'O', 'O', '-', 'O', '-'],
            ['O', '+', '+', 'O', 'O', '+', '+', 'O'],
            ['+', '-', '+', '-', '-', '+', '-', '+']
        ]
    },
    'Materia Scatter Reacotr Mk3': {
        name: 'Materia Scatter Reacotr Mk3',
        pattern: [
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['-', 'O', '-', 'O', 'O', '-', 'O', '-'],
            ['+', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '-', '+', '-', '-', '+', '-', '+']
        ]
    },
    'Null Wave Reactor Mk1': {
        name: 'Null Wave Reactor Mk1',
        pattern: [
            ['O', 'O', '-', '-', '-', '-', 'O', 'O'],
            ['O', 'O', 'O', '-', '-', 'O', 'O', 'O'],
            ['-', '+', '+', 'O', 'O', '+', '+', '-'],
            ['-', '-', '+', 'O', 'O', '+', '-', '-']
        ]
    },
    'Null Wave Reactor Mk2': {
        name: 'Null Wave Reactor Mk2',
        pattern: [
            ['+', 'O', '-', '-', '-', '-', 'O', '+'],
            ['+', 'O', 'O', '-', '-', 'O', 'O', '+'],
            ['-', '+', '+', 'O', 'O', '+', '+', '-'],
            ['-', '-', '+', 'O', 'O', '+', '-', '-']
        ]
    },
    'Null Wave Reactor Mk3': {
        name: 'Null Wave Reactor Mk3',
        pattern: [
            ['+', 'O', '-', '-', '-', '-', 'O', '+'],
            ['+', '+', 'O', '-', '-', 'O', '+', '+'],
            ['-', '+', '+', 'O', 'O', '+', '+', '-'],
            ['-', '-', '+', 'O', 'O', '+', '-', '-']
        ]
    }
};
