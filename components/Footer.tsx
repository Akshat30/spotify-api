import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiYoutube,
} from "react-icons/fi";

const socialLinks = [
  {
    id: 1,
    icon: <FiMail />,
    url: "mailto:akshat30@gmail.com",
  },
  {
    id: 2,
    icon: <FiGithub />,
    url: "https://github.com/Akshat30",
  },
  {
    id: 3,
    icon: <FiLinkedin />,
    url: "https://www.linkedin.com/in/akshatja1n",
  },
];

const Footer = () => {
  return (
    <div className="container mx-auto">
      <div className="pt-20 sm:pt-30 pb-8 mt-20">
        {/* Footer social links */}
        {/* <div className="font-general-medium flex flex-col justify-center items-center mb-12 sm:mb-20">
          <ul className="flex gap-4 sm:gap-8">
            {socialLinks.map((link) => (
              <a
                href={link.url}
                target="__blank"
                key={link.id}
                className="text-white-100 px-3 py-3 cursor-pointer rounded-lg bg-green-400 hover:bg-green-700 shadow-sm duration-300"
              >
                <i className="text-3xl">{link.icon}</i>
              </a>
            ))}
          </ul>
        </div> */}

        <div className="font-general-regular flex justify-center items-center text-center mb-10">
          <div className="text-lg text-ternary-dark">
            &copy; {new Date().getFullYear()}
            <a className="ml-1">akshat jain &bull;</a>
            <a
              href="https://akshatj.vercel.app"
              target="__blank"
              className="text-secondary-dark font-medium hover:underline hover:text-green-500 ml-1 duration-500"
            >
              more about aj
            </a>{" "}
            &bull;
            <a
              href=""
              target="__blank"
              className="text-secondary-dark font-medium hover:underline hover:text-green-500 ml-1 duration-500"
            >
              sources
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
