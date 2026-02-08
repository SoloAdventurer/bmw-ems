// Import your closeup images here
import imgO2Pre from "../assets/images/sensors/oxygen_pre_cat.jpg";
import imgO2Post from "../assets/images/sensors/oxygen_post_cat.jpg";
import imgThrottle from "../assets/images/sensors/throttle.jpg";
import imgCoolant from "../assets/images/sensors/coolant.png";
import imgMaf from "../assets/images/sensors/maf_sensor.jpg";
import imgMap from "../assets/images/sensors/map_sensor.jpg";
import throttleSound from "../assets/audio/throttle.mp3";

export interface SensorData {
  id: string;
  name: string;
  image: string;
  sound?: string;
  type: "Input" | "Output";
  function: string;
  howItWorks: string;
  variations: string[];
  healthyRange: string;
}

export const sensors: Record<string, SensorData> = {
  maf: {
    id: "maf",
    name: "Mass Air Flow (MAF)",
    image: imgMaf,
    type: "Input",
    function:
      "Measures the mass of air entering the intake to calculate precise fuel injection quantity.",
    howItWorks:
      "A heated film or wire is cooled by incoming air. The DME measures the electrical current required to maintain the wire's temperature, which correlates to air mass.",
    variations: [
      "Hot Wire (Bosch)",
      "Hot Film (Modern BMWs)",
      "Vane Meter (Old E30/E36)",
    ],
    healthyRange:
      "Idle: 3.5 - 4.5 g/s (approx 0.6V - 1.0V) | WOT: Increases linearly with RPM",
  },
  map: {
    id: "map",
    name: "Manifold Absolute Pressure (MAP)",
    image: imgMap,
    type: "Input",
    function:
      "Measures vacuum or positive boost pressure inside the intake manifold to determine engine load.",
    howItWorks:
      "Uses a piezo-resistive crystal that changes electrical resistance based on pressure deflection.",
    variations: [
      "Standard MAP (Vacuum only)",
      "T-MAP (Temperature + Pressure, used in Turbo N54/N55)",
    ],
    healthyRange:
      "Idle (Vacuum): ~0.3-0.5 bar absolute | Boost (N54): Up to 2.5 bar absolute (Voltage: 0.5V to 4.5V)",
  },
  o2_pre: {
    id: "o2_pre",
    name: "Pre-Catalytic O2 Sensor",
    image: imgO2Pre,
    type: "Input",
    function:
      "Monitors raw exhaust gas to manage engine fueling (Closed Loop).",
    howItWorks:
      "A wideband sensor (LSU) that provides a precise Lambda value to the DME.",
    variations: ["Wideband (5-wire)", "LSU 4.9"],
    healthyRange:
      "Lambda ≈ 1.0 (Stoichiometric) | Typically oscillates between ~0.9 (Rich) and ~1.1 (Lean)",
  },
  o2_post: {
    id: "o2_post",
    name: "Post-Catalytic O2 Sensor",
    image: imgO2Post,
    type: "Input",
    function: "Verifies the efficiency of the catalytic converter.",
    howItWorks:
      "A narrowband sensor that expects to see a steady oxygen level after the catalyst has done its job.",
    variations: ["Narrowband (4-wire)"],
    healthyRange:
      "Steady 0.6V to 0.7V once the catalyst is at operating temperature.",
  },
  throttle: {
    id: "throttle",
    name: "Electronic Throttle Body",
    image: imgThrottle,
    sound: throttleSound,
    type: "Output",
    function:
      "Controls the volume of air entering the engine based on pedal position and DME torque requests.",
    howItWorks:
      "DME sends a PWM signal to a DC motor to open the plate. Dual potentiometers (TPS 1 & 2) verify the position.",
    variations: ["Cable Actuated (Older)", "Drive-by-Wire (EDK/MDK)"],
    healthyRange:
      "TPS 1: 0.5V (Closed) -> 4.5V (WOT) | TPS 2: Inverted signal for safety redundancy",
  },
  coolant: {
    id: "coolant",
    name: "Coolant Temperature Sensor (ECT)",
    image: imgCoolant,
    type: "Input",
    function:
      "Measures engine coolant temperature for cold-start enrichment, fan control, emissions strategy, and safety limits.",
    howItWorks:
      "NTC thermistor (Negative Temperature Coefficient). Resistance decreases as temperature increases.",
    variations: [
      "Single Channel (DME only)",
      "Dual Channel (DME + Instrument Cluster)",
    ],
    healthyRange:
      "Cold (20°C): ~2500 Ohms | Operating Temp (90°C): ~200-300 Ohms",
  },
};
