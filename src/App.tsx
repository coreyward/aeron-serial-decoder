import { useState } from 'react';
import { decodeSerial } from './decoder';
import type { DecodedSerial } from './types';
import { examples } from './examples';
import './App.css';

function App() {
  const [serialInput, setSerialInput] = useState('');
  const [decoded, setDecoded] = useState<DecodedSerial | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    setError(null);

    if (!serialInput.trim()) {
      setError('Please enter a serial number');
      setDecoded(null);
      return;
    }

    const result = decodeSerial(serialInput.trim());

    if (!result) {
      setError('Unable to decode this serial number. Please check that it is entered correctly.');
      setDecoded(null);
    } else {
      setDecoded(result);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDecode();
    }
  };

  const handleExample = (serial: string) => {
    setSerialInput(serial);
    const result = decodeSerial(serial);
    if (result) {
      setDecoded(result);
      setError(null);
    }
  };

  return (
    <div className="app">
      <main className="main">
        <div className="header-section">
          <div className="title-row">
            <img src="/favicon.png" alt="Aeron Chair" className="logo" />
            <h1>Aeron Chair Serial Decoder</h1>
          </div>
          <p className="subtitle">
            Decode your Herman Miller Aeron chair's serial number to discover its features and specifications.
          </p>
        </div>

        <div className="input-section">
          <label htmlFor="serial-input">
            Serial Number
          </label>
          <div className="input-row">
            <input
              id="serial-input"
              type="text"
              value={serialInput}
              onChange={(e) => setSerialInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter serial number"
              className="serial-input"
            />
            <button onClick={handleDecode} className="decode-button">
              Decode
            </button>
          </div>
          <div className="examples">
            <span className="examples-label">Try it:</span>
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExample(example.serial)}
                className="example-button"
                title={example.description}
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {decoded && (
          <div className="results">
            <h2>Your Aeron Chair Configuration</h2>

            <div className="config-grid">
              <div className="config-item">
                <span className="config-label">Model</span>
                <span className="config-value">{decoded.model.description}</span>
                <span className="config-code">{decoded.model.code}</span>
              </div>

              <div className="config-item">
                <span className="config-label">Size</span>
                <span className="config-value">{decoded.size.description}</span>
                <span className="config-code">{decoded.size.code}</span>
              </div>

              <div className="config-item">
                <span className="config-label">Height Range</span>
                <span className="config-value">{decoded.heightAdjustment.description}</span>
                <span className="config-code">{decoded.heightAdjustment.code}</span>
              </div>

              <div className="config-item">
                <span className="config-label">Tilt</span>
                <span className="config-value">{decoded.tilt.description}</span>
                <span className="config-code">{decoded.tilt.code}</span>
              </div>

              <div className="config-item">
                <span className="config-label">Arms</span>
                <span className="config-value">{decoded.arms.description}</span>
                <span className="config-code">{decoded.arms.code}</span>
              </div>

              {decoded.arms.code !== 'N' && (
                <div className="config-item">
                  <span className="config-label">Armpad Type</span>
                  <span className="config-value">{decoded.armpadUpholstery.description}</span>
                  <span className="config-code">{decoded.armpadUpholstery.code}</span>
                </div>
              )}

              {decoded.armpadFinish.code !== 'N/A' && (
                <div className="config-item">
                  <span className="config-label">Armpad Finish</span>
                  <span className="config-value">{decoded.armpadFinish.description}</span>
                  <span className="config-code">{decoded.armpadFinish.code}</span>
                </div>
              )}

              <div className="config-item">
                <span className="config-label">Back Support</span>
                <span className="config-value">{decoded.backSupport.description}</span>
                <span className="config-code">{decoded.backSupport.code}</span>
              </div>

              <div className="config-item">
                <span className="config-label">Frame Finish</span>
                <span className="config-value">{decoded.frameFinish.description}</span>
                <span className="config-code">{decoded.frameFinish.code}</span>
              </div>

              <div className="config-item">
                <span className="config-label">Chassis Finish</span>
                <span className="config-value">{decoded.chassisFinish.description}</span>
                <span className="config-code">{decoded.chassisFinish.code}</span>
              </div>

              <div className="config-item">
                <span className="config-label">Base Finish</span>
                <span className="config-value">{decoded.baseFinish.description}</span>
                <span className="config-code">{decoded.baseFinish.code}</span>
              </div>

              <div className="config-item">
                <span className="config-label">Casters</span>
                <span className="config-value">{decoded.casters.description}</span>
                <span className="config-code">{decoded.casters.code}</span>
              </div>

              {decoded.remaining && (
                <div className="config-item remaining">
                  <span className="config-label">Additional Info</span>
                  <span className="config-value">Date/Batch Code</span>
                  <span className="config-code">{decoded.remaining}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {!decoded && !error && (
          <div className="placeholder">
            <p>Enter your Aeron chair's serial number above to see its configuration details.</p>
            <p className="hint">The serial number is typically found on a label underneath the seat.</p>
          </div>
        )}

        <footer className="footer">
          <p>
            This decoder uses information from the{' '}
            <a
              href="https://www.hermanmiller.com/content/dam/hermanmiller/documents/pricing/PB_AEN.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Herman Miller Aeron Chairs Price Book
            </a>. Last updated Oct 2025.
            Not affiliated with Herman Miller.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
