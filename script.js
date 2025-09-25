// Ship Configuration System
class ShipConfigurator {
    constructor() {
        this.currentShip = 'Catamaran';
        this.selectedReactor = 'Split Reactor Mk1';
        this.selectedAuxGenA = '-Empty-';
        this.selectedAuxGenB = '-Empty-';
        this.deviceSelections = {};
        this.devicePriorities = {};
        this.grid = Array(8).fill().map(() => Array(8).fill(null));
        this.placedDevices = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDeviceCategories();
        this.updateGrid();
        this.autoLoadConfiguration();
    }

    setupEventListeners() {
        // Ship selection
        document.querySelectorAll('input[name="ship"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentShip = e.target.value;
                this.updateDeviceCategories();
                this.clearLayout();
            });
        });

        // Power system selections
        document.getElementById('reactor-select').addEventListener('change', (e) => {
            this.selectedReactor = e.target.value;
            this.updateGrid();
        });

        document.getElementById('aux-gen-a-select').addEventListener('change', (e) => {
            this.selectedAuxGenA = e.target.value;
            this.updateGrid();
        });

        document.getElementById('aux-gen-b-select').addEventListener('change', (e) => {
            this.selectedAuxGenB = e.target.value;
            this.updateGrid();
        });

        // Action buttons
        document.getElementById('generate-layout').addEventListener('click', () => {
            this.generateOptimalLayout();
        });

        document.getElementById('clear-layout').addEventListener('click', () => {
            this.clearLayout();
        });

        document.getElementById('reset-configuration').addEventListener('click', () => {
            this.resetConfiguration();
        });

        document.getElementById('save-layout').addEventListener('click', () => {
            this.saveConfiguration();
        });

        document.getElementById('load-layout').addEventListener('click', () => {
            this.loadConfiguration();
        });
    }

    updateDeviceCategories() {
        const container = document.getElementById('device-categories');
        container.innerHTML = '';

        const allowedDevices = SHIPS[this.currentShip].allowedDevices;

        allowedDevices.forEach(deviceType => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'device-category';

            // Map device types to their consolidated lists
            let deviceListKey = deviceType;
            if (deviceType === 'Pilot Weapon A' || deviceType === 'Pilot Weapon B') {
                deviceListKey = 'Pilot Weapon';
            } else if (deviceType === 'Special Weapon A' || deviceType === 'Special Weapon B') {
                deviceListKey = 'Special Weapon';
            }

            const deviceOptions = Object.keys(DEVICES[deviceListKey]);
            
            categoryDiv.innerHTML = `
                <h4>${deviceType}</h4>
                <div class="device-controls">
                    <select id="device-${deviceType.replace(/\s+/g, '-').toLowerCase()}">
                        ${deviceOptions.map(option => 
                            `<option value="${option}">${option}</option>`
                        ).join('')}
                    </select>
                    <div class="priority-input">
                        <label>Priority:</label>
                        <input type="number" min="0" max="7" value="0" 
                               id="priority-${deviceType.replace(/\s+/g, '-').toLowerCase()}">
                    </div>
                </div>
            `;

            container.appendChild(categoryDiv);

            // Add event listeners for device selections
            const deviceSelect = categoryDiv.querySelector('select');
            const priorityInput = categoryDiv.querySelector('input');

            deviceSelect.addEventListener('change', (e) => {
                this.deviceSelections[deviceType] = e.target.value;
            });

            priorityInput.addEventListener('change', (e) => {
                this.devicePriorities[deviceType] = parseInt(e.target.value);
            });

            // Initialize selections - Special Weapons default to -Empty-
            if (deviceType === 'Special Weapon A' || deviceType === 'Special Weapon B') {
                this.deviceSelections[deviceType] = '-Empty-';
                deviceSelect.value = '-Empty-';
            } else {
                this.deviceSelections[deviceType] = deviceOptions[0];
                deviceSelect.value = deviceOptions[0];
            }
            this.devicePriorities[deviceType] = 0;
        });
    }

    updateGrid() {
        this.createGrid();
        this.applyPowerSystems();
        this.renderGrid();
    }

    createGrid() {
        // Initialize empty grid
        this.grid = Array(8).fill().map(() => Array(8).fill({
            type: 'unavailable',
            protected: false,
            device: null
        }));
    }

    applyPowerSystems() {
        // Apply reactor (rows 0-3)
        const reactor = REACTORS[this.selectedReactor];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 8; col++) {
                const cellType = reactor.pattern[row][col];
                
                this.grid[row][col] = {
                    type: (cellType === 'O' || cellType === '+') ? 'available' : 'unavailable',
                    protected: cellType === '+',
                    device: null
                };
            }
        }

        // Apply Auxiliary Generator A (rows 4-5)
        const auxGenA = AUXILIARY_GENERATORS['Auxiliary Generator'][this.selectedAuxGenA];
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 8; col++) {
                const cellType = auxGenA.pattern[row][col];
                
                this.grid[row + 4][col] = {
                    type: (cellType === 'O' || cellType === '+') ? 'available' : 'unavailable',
                    protected: cellType === '+',
                    device: null
                };
            }
        }

        // Apply Auxiliary Generator B (rows 6-7)
        const auxGenB = AUXILIARY_GENERATORS['Auxiliary Generator'][this.selectedAuxGenB];
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 8; col++) {
                const cellType = auxGenB.pattern[row][col];
                
                this.grid[row + 6][col] = {
                    type: (cellType === 'O' || cellType === '+') ? 'available' : 'unavailable',
                    protected: cellType === '+',
                    device: null
                };
            }
        }
    }

    renderGrid() {
        const gridContainer = document.getElementById('ship-grid');
        gridContainer.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const gridCell = this.grid[row][col];
                
                if (gridCell.device) {
                    cell.classList.add('occupied');
                    cell.style.backgroundColor = gridCell.device.color;
                    cell.textContent = gridCell.device.name.charAt(0);
                    cell.title = `${gridCell.device.category}: ${gridCell.device.name}`;
                    
                    // Set text color based on background brightness
                    const textColor = this.getContrastColor(gridCell.device.color);
                    cell.style.color = textColor;
                } else {
                    if (gridCell.protected && gridCell.type === 'available') {
                        cell.classList.add('protected');
                    } else {
                        cell.classList.add(gridCell.type);
                    }
                }

                gridContainer.appendChild(cell);
            }
        }
    }

    generateOptimalLayout() {
        this.clearLayout();
        
        // Get devices to place, sorted by priority
        const devicesToPlace = [];
        const allowedDevices = SHIPS[this.currentShip].allowedDevices;

        allowedDevices.forEach(deviceType => {
            if (this.deviceSelections[deviceType] && this.deviceSelections[deviceType] !== '-Empty-') {
                // Map device types to their consolidated lists
                let deviceListKey = deviceType;
                if (deviceType === 'Pilot Weapon A' || deviceType === 'Pilot Weapon B') {
                    deviceListKey = 'Pilot Weapon';
                } else if (deviceType === 'Special Weapon A' || deviceType === 'Special Weapon B') {
                    deviceListKey = 'Special Weapon';
                }
                
                const deviceConfig = DEVICES[deviceListKey][this.deviceSelections[deviceType]];
                // Only add devices that have a valid shape (not empty)
                if (deviceConfig && deviceConfig.shape && deviceConfig.shape.length > 0) {
                    // Use different colors for A/B variants
                    let deviceColor = deviceConfig.color;
                    if (deviceType === 'Pilot Weapon B') {
                        deviceColor = '#BB8FCE'; // Purple color for Pilot Weapon B
                    } else if (deviceType === 'Special Weapon B') {
                        deviceColor = '#D7BDE2'; // Light purple color for Special Weapon B
                    }
                    
                    devicesToPlace.push({
                        category: deviceType,
                        name: this.deviceSelections[deviceType],
                        priority: this.devicePriorities[deviceType] || 0,
                        shape: deviceConfig.shape,
                        color: deviceColor
                    });
                }
            }
        });

        // Sort by priority (lower number = higher priority)
        devicesToPlace.sort((a, b) => a.priority - b.priority);

        // Try to fit all devices using a fitting-first approach
        const result = this.fitAllDevices(devicesToPlace);
        
        this.placedDevices = result.placed;
        this.failedDevices = result.failed;

        this.renderGrid();
        this.updatePlacementInfo();
    }

    fitAllDevices(devices) {
        // Try multiple placement strategies to maximize successful placements
        let bestResult = { placed: [], failed: [...devices] };
        let bestScore = 0;

        // Try different placement orders to find the best fit
        const strategies = [
            // Original priority order
            [...devices],
            // Reverse priority order (sometimes smaller devices first helps)
            [...devices].reverse(),
            // Size order (smallest first)
            [...devices].sort((a, b) => this.getDeviceSize(a.shape) - this.getDeviceSize(b.shape)),
            // Size order (largest first)
            [...devices].sort((a, b) => this.getDeviceSize(b.shape) - this.getDeviceSize(a.shape))
        ];

        strategies.forEach(strategy => {
            const result = this.tryPlacementStrategy(strategy);
            const score = result.placed.length;
            
            if (score > bestScore) {
                bestScore = score;
                bestResult = result;
            }
        });

        // Apply the best result to the grid
        this.clearLayout();
        bestResult.placed.forEach(device => {
            this.placeDevice(device, device.position.row, device.position.col, device.position.shape);
        });

        return bestResult;
    }

    tryPlacementStrategy(devices) {
        // Create a temporary grid for this strategy
        const tempGrid = Array(8).fill().map(() => Array(8).fill({
            type: 'unavailable',
            protected: false,
            device: null
        }));

        // Apply power systems to temp grid
        this.applyPowerSystemsToGrid(tempGrid);

        const placed = [];
        const failed = [];

        devices.forEach(device => {
            const placement = this.findAnyValidPlacement(device, tempGrid);
            if (placement) {
                // Place device on temp grid
                this.placeDeviceOnGrid(device, placement.row, placement.col, placement.shape, tempGrid);
                placed.push({
                    ...device,
                    position: placement,
                    rotation: placement.rotation
                });
            } else {
                failed.push({
                    category: device.category,
                    name: device.name,
                    priority: device.priority,
                    reason: 'No available space found for device placement (tried all rotations)'
                });
            }
        });

        return { placed, failed };
    }

    findAnyValidPlacement(device, grid) {
        const originalShape = device.shape;
        const rotations = this.getAllRotations(originalShape);
        
        // Find ANY valid placement - no optimization, just fit
        for (let rotationIndex = 0; rotationIndex < rotations.length; rotationIndex++) {
            const shape = rotations[rotationIndex];
            const shapeHeight = shape.length;
            const shapeWidth = shape[0].length;

            for (let row = 0; row <= 8 - shapeHeight; row++) {
                for (let col = 0; col <= 8 - shapeWidth; col++) {
                    if (this.canPlaceDeviceOnGrid(shape, row, col, grid)) {
                        return {
                            row,
                            col,
                            shape: shape,
                            rotation: rotationIndex
                        };
                    }
                }
            }
        }

        return null;
    }

    getDeviceSize(shape) {
        let size = 0;
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[0].length; col++) {
                if (shape[row][col] === 'X') {
                    size++;
                }
            }
        }
        return size;
    }

    applyPowerSystemsToGrid(grid) {
        // Apply reactor (rows 0-3)
        const reactor = REACTORS[this.selectedReactor];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 8; col++) {
                const cellType = reactor.pattern[row][col];
                
                grid[row][col] = {
                    type: (cellType === 'O' || cellType === '+') ? 'available' : 'unavailable',
                    protected: cellType === '+',
                    device: null
                };
            }
        }

        // Apply Auxiliary Generator A (rows 4-5)
        const auxGenA = AUXILIARY_GENERATORS['Auxiliary Generator'][this.selectedAuxGenA];
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 8; col++) {
                const cellType = auxGenA.pattern[row][col];
                
                grid[row + 4][col] = {
                    type: (cellType === 'O' || cellType === '+') ? 'available' : 'unavailable',
                    protected: cellType === '+',
                    device: null
                };
            }
        }

        // Apply Auxiliary Generator B (rows 6-7)
        const auxGenB = AUXILIARY_GENERATORS['Auxiliary Generator'][this.selectedAuxGenB];
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 8; col++) {
                const cellType = auxGenB.pattern[row][col];
                
                grid[row + 6][col] = {
                    type: (cellType === 'O' || cellType === '+') ? 'available' : 'unavailable',
                    protected: cellType === '+',
                    device: null
                };
            }
        }
    }

    canPlaceDeviceOnGrid(shape, startRow, startCol, grid) {
        const shapeHeight = shape.length;
        const shapeWidth = shape[0].length;

        for (let row = 0; row < shapeHeight; row++) {
            for (let col = 0; col < shapeWidth; col++) {
                if (shape[row][col] === 'X') {
                    const gridRow = startRow + row;
                    const gridCol = startCol + col;

                    if (gridRow >= 8 || gridCol >= 8) return false;
                    
                    const gridCell = grid[gridRow][gridCol];
                    if (gridCell.type !== 'available' || gridCell.device) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    placeDeviceOnGrid(device, startRow, startCol, rotatedShape, grid) {
        const shape = rotatedShape || device.shape;
        const shapeHeight = shape.length;
        const shapeWidth = shape[0].length;

        for (let row = 0; row < shapeHeight; row++) {
            for (let col = 0; col < shapeWidth; col++) {
                if (shape[row][col] === 'X') {
                    const gridRow = startRow + row;
                    const gridCol = startCol + col;
                    
                    grid[gridRow][gridCol].device = {
                        category: device.category,
                        name: device.name,
                        color: device.color
                    };
                }
            }
        }
    }

    rotateShape(shape) {
        // Rotate shape 90 degrees clockwise
        const rows = shape.length;
        const cols = shape[0].length;
        const rotated = Array(cols).fill().map(() => Array(rows).fill(' '));
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                rotated[col][rows - 1 - row] = shape[row][col];
            }
        }
        
        return rotated;
    }

    getAllRotations(shape) {
        // Generate all 4 rotations of the shape
        const rotations = [shape];
        let currentShape = shape;
        
        for (let i = 0; i < 3; i++) {
            currentShape = this.rotateShape(currentShape);
            rotations.push(currentShape);
        }
        
        return rotations;
    }

    findOptimalPlacement(device) {
        const originalShape = device.shape;
        const rotations = this.getAllRotations(originalShape);
        
        // Prioritize fitting all items - find any valid placement first
        const positions = [];

        // Try each rotation
        rotations.forEach((shape, rotationIndex) => {
            const shapeHeight = shape.length;
            const shapeWidth = shape[0].length;

            for (let row = 0; row <= 8 - shapeHeight; row++) {
                for (let col = 0; col <= 8 - shapeWidth; col++) {
                    if (this.canPlaceDevice(shape, row, col)) {
                        const protectedCount = this.countProtectedSquares(shape, row, col);
                        
                        // Modified scoring: prioritize fitting over protected squares
                        // Base score for any valid placement, bonus for protected squares and upper rows
                        const score = 1000 + (protectedCount * 10) + (8 - row);
                        
                        positions.push({
                            row,
                            col,
                            protectedCount,
                            score,
                            shape: shape,
                            rotation: rotationIndex
                        });
                    }
                }
            }
        });

        // Sort by score (higher is better) - all valid placements get high base score
        positions.sort((a, b) => b.score - a.score);

        return positions.length > 0 ? positions[0] : null;
    }

    canPlaceDevice(shape, startRow, startCol) {
        const shapeHeight = shape.length;
        const shapeWidth = shape[0].length;

        for (let row = 0; row < shapeHeight; row++) {
            for (let col = 0; col < shapeWidth; col++) {
                if (shape[row][col] === 'X') {
                    const gridRow = startRow + row;
                    const gridCol = startCol + col;

                    if (gridRow >= 8 || gridCol >= 8) return false;
                    
                    const gridCell = this.grid[gridRow][gridCol];
                    if (gridCell.type !== 'available' || gridCell.device) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    countProtectedSquares(shape, startRow, startCol) {
        let count = 0;
        const shapeHeight = shape.length;
        const shapeWidth = shape[0].length;

        for (let row = 0; row < shapeHeight; row++) {
            for (let col = 0; col < shapeWidth; col++) {
                if (shape[row][col] === 'X') {
                    const gridRow = startRow + row;
                    const gridCol = startCol + col;
                    
                    if (this.grid[gridRow][gridCol].protected) {
                        count++;
                    }
                }
            }
        }

        return count;
    }

    countAvailableSquares(shape, startRow, startCol) {
        let count = 0;
        const shapeHeight = shape.length;
        const shapeWidth = shape[0].length;

        for (let row = 0; row < shapeHeight; row++) {
            for (let col = 0; col < shapeWidth; col++) {
                if (shape[row][col] === 'X') {
                    const gridRow = startRow + row;
                    const gridCol = startCol + col;
                    
                    if (this.grid[gridRow][gridCol].type === 'available') {
                        count++;
                    }
                }
            }
        }

        return count;
    }

    placeDevice(device, startRow, startCol, rotatedShape = null) {
        const shape = rotatedShape || device.shape;
        const shapeHeight = shape.length;
        const shapeWidth = shape[0].length;

        for (let row = 0; row < shapeHeight; row++) {
            for (let col = 0; col < shapeWidth; col++) {
                if (shape[row][col] === 'X') {
                    const gridRow = startRow + row;
                    const gridCol = startCol + col;
                    
                    this.grid[gridRow][gridCol].device = {
                        category: device.category,
                        name: device.name,
                        color: device.color
                    };
                }
            }
        }
    }

    getContrastColor(hexColor) {
        // Convert hex color to RGB
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate luminance using the relative luminance formula
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return dark text for light backgrounds, light text for dark backgrounds
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }

    clearLayout() {
        this.placedDevices = [];
        this.updateGrid();
        this.updatePlacementInfo();
    }

    resetConfiguration() {
        // Reset ship selection to Catamaran
        this.currentShip = 'Catamaran';
        document.querySelector('input[name="ship"][value="Catamaran"]').checked = true;
        
        // Reset power systems to defaults
        this.selectedReactor = 'Split Reactor Mk1';
        this.selectedAuxGenA = '-Empty-';
        this.selectedAuxGenB = '-Empty-';
        
        // Update dropdown selections
        document.getElementById('reactor-select').value = this.selectedReactor;
        document.getElementById('aux-gen-a-select').value = this.selectedAuxGenA;
        document.getElementById('aux-gen-b-select').value = this.selectedAuxGenB;
        
        // Reset device selections and priorities
        this.deviceSelections = {};
        this.devicePriorities = {};
        
        // Clear placed devices
        this.placedDevices = [];
        this.failedDevices = [];
        
        // Regenerate device categories with defaults
        this.updateDeviceCategories();
        
        // Update grid and clear layout
        this.updateGrid();
        this.updatePlacementInfo();
    }

    saveConfiguration() {
        const configuration = {
            currentShip: this.currentShip,
            selectedReactor: this.selectedReactor,
            selectedAuxGenA: this.selectedAuxGenA,
            selectedAuxGenB: this.selectedAuxGenB,
            deviceSelections: { ...this.deviceSelections },
            devicePriorities: { ...this.devicePriorities },
            placedDevices: [...this.placedDevices],
            timestamp: new Date().toISOString()
        };

        try {
            localStorage.setItem('shipConfiguration', JSON.stringify(configuration));
            this.showNotification('Configuration saved successfully!', 'success');
        } catch (error) {
            console.error('Failed to save configuration:', error);
            this.showNotification('Failed to save configuration. Storage may be full.', 'error');
        }
    }

    loadConfiguration() {
        try {
            const savedConfig = localStorage.getItem('shipConfiguration');
            if (!savedConfig) {
                this.showNotification('No saved configuration found.', 'info');
                return;
            }

            const configuration = JSON.parse(savedConfig);
            this.applyConfiguration(configuration);
            this.showNotification('Configuration loaded successfully!', 'success');
        } catch (error) {
            console.error('Failed to load configuration:', error);
            this.showNotification('Failed to load configuration. Data may be corrupted.', 'error');
        }
    }

    applyConfiguration(config) {
        // Apply ship selection
        this.currentShip = config.currentShip || 'Catamaran';
        const shipRadio = document.querySelector(`input[name="ship"][value="${this.currentShip}"]`);
        if (shipRadio) {
            shipRadio.checked = true;
        }

        // Apply power systems
        this.selectedReactor = config.selectedReactor || 'Split Reactor Mk1';
        this.selectedAuxGenA = config.selectedAuxGenA || '-Empty-';
        this.selectedAuxGenB = config.selectedAuxGenB || '-Empty-';

        // Update dropdown selections
        document.getElementById('reactor-select').value = this.selectedReactor;
        document.getElementById('aux-gen-a-select').value = this.selectedAuxGenA;
        document.getElementById('aux-gen-b-select').value = this.selectedAuxGenB;

        // Apply device selections and priorities
        this.deviceSelections = config.deviceSelections || {};
        this.devicePriorities = config.devicePriorities || {};

        // Regenerate device categories to match the loaded ship
        this.updateDeviceCategories();

        // Apply loaded device selections to the UI
        Object.keys(this.deviceSelections).forEach(deviceType => {
            const deviceSelect = document.getElementById(`device-${deviceType.replace(/\s+/g, '-').toLowerCase()}`);
            const priorityInput = document.getElementById(`priority-${deviceType.replace(/\s+/g, '-').toLowerCase()}`);
            
            if (deviceSelect && this.deviceSelections[deviceType]) {
                deviceSelect.value = this.deviceSelections[deviceType];
            }
            if (priorityInput && this.devicePriorities[deviceType] !== undefined) {
                priorityInput.value = this.devicePriorities[deviceType];
            }
        });

        // Apply placed devices if they exist
        if (config.placedDevices && config.placedDevices.length > 0) {
            this.placedDevices = [...config.placedDevices];
            this.updateGrid();
            
            // Recreate the device placements on the grid
            this.placedDevices.forEach(device => {
                if (device.position && device.position.shape) {
                    this.placeDevice(device, device.position.row, device.position.col, device.position.shape);
                }
            });
        } else {
            this.clearLayout();
        }

        this.renderGrid();
        this.updatePlacementInfo();
    }

    autoLoadConfiguration() {
        try {
            const savedConfig = localStorage.getItem('shipConfiguration');
            if (savedConfig) {
                const configuration = JSON.parse(savedConfig);
                this.applyConfiguration(configuration);
                console.log('Auto-loaded saved configuration from:', configuration.timestamp);
            }
        } catch (error) {
            console.error('Failed to auto-load configuration:', error);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    updatePlacementInfo() {
        const container = document.getElementById('device-list');
        container.innerHTML = '';

        if (this.placedDevices.length === 0 && (!this.failedDevices || this.failedDevices.length === 0)) {
            container.innerHTML = '<p>No devices placed. Click "Generate Optimal Layout" to place devices.</p>';
            return;
        }

        // Display successfully placed devices
        this.placedDevices.forEach(device => {
            const deviceDiv = document.createElement('div');
            deviceDiv.className = 'device-placement';
            deviceDiv.style.borderLeftColor = device.color;

            const rotationText = device.rotation > 0 ? ` (Rotated ${device.rotation * 90}°)` : '';

            deviceDiv.innerHTML = `
                <div class="device-color" style="background-color: ${device.color}"></div>
                <div class="device-info">
                    <div class="device-name">${device.category}</div>
                    <div class="device-details">
                        ${device.name} (Priority: ${device.priority}) - 
                        Position: Row ${device.position.row + 1}, Col ${device.position.col + 1}${rotationText}
                    </div>
                </div>
            `;

            container.appendChild(deviceDiv);
        });

        // Display failed devices with error messages
        if (this.failedDevices && this.failedDevices.length > 0) {
            const errorHeader = document.createElement('div');
            errorHeader.className = 'error-header';
            errorHeader.innerHTML = '<h4 style="color: #e74c3c; margin: 20px 0 10px 0;">⚠️ Placement Errors:</h4>';
            container.appendChild(errorHeader);

            this.failedDevices.forEach(device => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'device-placement error';
                errorDiv.style.borderLeftColor = '#e74c3c';
                errorDiv.style.backgroundColor = '#fdf2f2';

                errorDiv.innerHTML = `
                    <div class="device-color" style="background-color: #e74c3c;">❌</div>
                    <div class="device-info">
                        <div class="device-name" style="color: #e74c3c;">${device.category}</div>
                        <div class="device-details" style="color: #c0392b;">
                            ${device.name} (Priority: ${device.priority}) - 
                            ERROR: ${device.reason}
                        </div>
                    </div>
                `;

                container.appendChild(errorDiv);
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ship Configuration System loaded successfully!');
    new ShipConfigurator();
});
