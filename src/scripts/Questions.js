const quizzes = {
    gates: {
        name: 'Quantum Gates',
        questions: [
            { question: 'What is the result of applying H gate to |0⟩?', options: ['|0⟩', '|1⟩', 'Superposition', 'Measurement'], correct: 2, explanation: 'The Hadamard gate creates an equal superposition: H|0⟩ = (|0⟩ + |1⟩)/√2. This is one of the fundamental operations in quantum computing.' },
            { question: 'What does the Pauli X gate do to |0⟩?', options: ['Creates superposition', 'Flips to |1⟩', 'Measures the qubit', 'Applies phase shift'], correct: 1, explanation: 'The Pauli X gate is equivalent to the classical NOT operation: X|0⟩ = |1⟩ and X|1⟩ = |0⟩.' },
            { question: 'Which gate applies a π phase to |1⟩?', options: ['Hadamard (H)', 'Pauli Z', 'CNOT', 'Swap gate'], correct: 1, explanation: 'The Pauli Z gate applies: Z|0⟩ = |0⟩ and Z|1⟩ = -|1⟩, adding a π phase to the |1⟩ state.' },
            { question: 'What is a two-qubit entangling gate?', options: ['X gate', 'Y gate', 'CNOT gate', 'T gate'], correct: 2, explanation: 'The CNOT (Controlled-NOT) gate is used to create entanglement between qubits. It flips the target qubit if the control qubit is |1⟩.' },
            { question: 'What happens when you apply H twice?', options: ['Get identity', 'Get -I', 'Get X', 'Creates superposition'], correct: 0, explanation: 'The Hadamard gate is self-adjoint: H² = I. Applying it twice returns the original state.' }
        ]
    },
    superposition: {
        name: 'Superposition',
        questions: [
            { question: 'A qubit in superposition can be described as?', options: ['Either 0 or 1', 'Both 0 and 1 simultaneously', 'Random value', 'Unknown state'], correct: 1, explanation: 'Superposition allows a qubit to exist as a linear combination of basis states simultaneously: α|0⟩ + β|1⟩.' },
            { question: 'How many basis states in a 2-qubit superposition?', options: ['2', '4', '3', '8'], correct: 1, explanation: 'Two qubits have 4 computational basis states: |00⟩, |01⟩, |10⟩, |11⟩. A 2-qubit superposition can be a combination of all these states.' },
            { question: 'What is the amplitude |α| when H is applied to |0⟩?', options: ['1', '1/2', '1/√2', '1/4'], correct: 2, explanation: 'H|0⟩ = (|0⟩ + |1⟩)/√2, so the amplitude for both |0⟩ and |1⟩ is 1/√2.' },
            { question: 'Superposition collapses when?', options: ['Always happens', 'We measure it', 'Time passes', 'Qubits interact'], correct: 1, explanation: 'Measurement causes superposition to collapse to one of the basis states. The probability of each outcome is |amplitude|².' },
            { question: 'What is the probability of measuring |0⟩ from (|0⟩ + |1⟩)/√2?', options: ['0%', '50%', '75%', '100%'], correct: 1, explanation: 'The amplitude for |0⟩ is 1/√2, so probability = |1/√2|² = 1/2 = 50%.' }
        ]
    },
    measurement: {
        name: 'Measurement',
        questions: [
            { question: 'Measurement outcome probability is determined by?', options: ['The phase', 'Amplitude squared', 'Number of qubits', 'Gate sequence'], correct: 1, explanation: 'The probability of measuring a state is the square of its amplitude: P = |amplitude|².' },
            { question: 'Can we know the exact state without measuring?', options: ['Yes, always', 'Sometimes', 'Never in quantum', 'Only for 1 qubit'], correct: 2, explanation: 'Quantum mechanics is probabilistic. We cannot predict individual measurement outcomes, only probabilities.' },
            { question: 'What happens to the state after measurement?', options: ['Unchanged', 'Collapsed to measured state', 'Random', 'Entangled'], correct: 1, explanation: 'After measurement, the quantum state collapses to the measured basis state. Subsequent measurements will give the same result.' },
            { question: 'Measuring a qubit multiple times gives?', options: ['Different results', 'Same result', 'Random outcomes', 'No info'], correct: 1, explanation: 'Once a qubit is measured and collapses to a state, repeated measurements yield the same result with 100% probability.' },
            { question: 'Bell measurement involves how many qubits?', options: ['1 qubit', '2 qubits', '3 qubits', '4 qubits'], correct: 1, explanation: 'Bell measurement (or Bell state measurement) is performed on 2 qubits and produces 2 classical bits of information.' }
        ]
    }
};