import  { Suspense } from "react";
import SplashScreen from "./SplashScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import Homepage from "./Homepage";
import StoryDetatils from "./storyDetails";
import JobDetails from "./JobDetails";
import JobApplicationForm from './JobApplicationForm';
import ApplyForJob from './ApplyForJob'
import QrScanner from "./QrScanner";
import TeacherApp from "./TeacherApp";
import Chatbot from "./Chatbot";
import Chatbotui from "./Chatbotui";
import DikshachatbotUi from "./DikshachatbotUi";
import Collections from "./Collection/Collections";
import CollectionDetails from "./Collection/CollectionDetails";
import CollectionStories from "./Collection/CollectionStories";
import BookMarkContentDetails from "./BookMarks/BookMarkContentDetails";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import MyBookMarks from "./BookMarks/BookMarks";
import Profile from "./Profile/Profile";
import MyBookMarksContent from "./BookMarks/myBookMarksContent";

import MyLocalBookMarksContent from "./BookMarks/LocalBookMarks/LocalmyBookMarksContent";
import LocalBookMarkContentDetails from "./BookMarks/LocalBookMarks/LocalBookMarkContentDetails";

function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/storyDetails" element={<StoryDetatils />} />
            <Route path="/jobDetails" element={<JobDetails />} />
            <Route path="/applicationForm" element={<JobApplicationForm />} />
            <Route path="/apply" element={<ApplyForJob />} />

            <Route
              path="/contentDetails"
              element={<BookMarkContentDetails />}
            />
            <Route path="/myBookMarks" element={<MyBookMarks />} />
            <Route path="/config" element={<Profile />} />

            <Route
              path="/myBookMarksContent"
              element={<MyBookMarksContent />}
            />
            <Route
              path="/collectionstoryDetails"
              element={<CollectionStories />}
            />
            <Route path="/collectionDetails" element={<CollectionDetails />} />
            <Route path="/qrscanner" element={<QrScanner />} />
            <Route path="/teacherapp" element={<TeacherApp />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/chatbotui" element={<Chatbotui />} />
            <Route path="/dikshachatui" element={<DikshachatbotUi />} />

            <Route
              path="/bookMarksDetails"
              element={<LocalBookMarkContentDetails />}
            />

            <Route path="/bookmarks" element={<MyLocalBookMarksContent />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;