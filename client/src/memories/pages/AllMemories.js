import React from "react";
import MemoryList from "../components/MemoryList";
import moment from "moment";

const DUMMY_MEMORIES = [
   {
      id: "m1",
      title: "Test title",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl:
         "https://images.unsplash.com/photo-1650464187828-d380b8edbc0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      creatorId: "foxsaysderp",
      createdOn: moment().format("LL"),
   },
   {
      id: "m2",
      title: "Test title",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl:
         "https://images.unsplash.com/photo-1650464232600-68f45ea392ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      creatorId: "hugephotographer2022",
      createdOn: moment().format("LL"),
   },
];

const AllMemories = () => {
   return <MemoryList items={DUMMY_MEMORIES} />;
};

export default AllMemories;
