import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import Test from "./src/Test";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <Test />
    </TailwindProvider>
  );
}
