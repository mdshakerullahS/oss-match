import { ProcessVisual } from "./processVisual";

const Step = ({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) => (
  <li className="flex gap-4">
    <span className="text-primary font-mono font-bold text-lg">{number}</span>
    <div>
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <p className="text-muted-foreground">{text}</p>
    </div>
  </li>
);

export const Process = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Built for the modern <br /> open-source developer.
            </h2>
            <ul className="space-y-6">
              <Step
                number="01"
                title="Connect your Account"
                text="Sign in securely via GitHub. No write access required."
              />
              <Step
                number="02"
                title="Define your Stack"
                text="Choose the languages and labels you prefer."
              />
              <Step
                number="03"
                title="Claim your Issue"
                text="Navigate to GitHub and start your Pull Request."
              />
            </ul>
          </div>

          <ProcessVisual />
        </div>
      </div>
    </section>
  );
};
