import ReactCountdown from "react-countdown";

type Props = {
  date: number;
};

const Countdown = ({ date }: Props) => <ReactCountdown date={date} />;

export default Countdown;
