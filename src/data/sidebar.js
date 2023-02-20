import { MdDashboard } from 'react-icons/md';
import { SiAddthis } from 'react-icons/si';
import {MdOutlineAccountBalance} from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { AiTwotoneEdit } from 'react-icons/ai';
import {RiContactsLine} from 'react-icons/ri';

const menu = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <SiAddthis />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <MdOutlineAccountBalance />,
    childrens: [
      {
        title: "Profile",
        icon: <CgProfile />,
        path: "/profile",
      },
      {
        title: "Edit Profile",
        icon: <AiTwotoneEdit />,
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Contact us",
    icon: <RiContactsLine/>,
    path: "/contact-us",
  },
];

export default menu;