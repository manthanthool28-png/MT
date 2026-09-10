import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import CourtVision3D from './pages/work/CourtVision3D.jsx'
import CsisPortal from './pages/work/CsisPortal.jsx'
import LaundryXpress from './pages/work/LaundryXpress.jsx'
import ToLetGlobe from './pages/work/ToLetGlobe.jsx'
import DesignQualities from './pages/work/DesignQualities.jsx'
import SmartShelf from './pages/work/SmartShelf.jsx'
import CinematicAutomotive from './pages/work/CinematicAutomotive.jsx'
import KingRun from './pages/work/KingRun.jsx'
import NowIAmBecomeDeath from './pages/work/NowIAmBecomeDeath.jsx'
import DetachableKaleidoscope from './pages/work/DetachableKaleidoscope.jsx'
import AlgorithmicSoundscape from './pages/work/AlgorithmicSoundscape.jsx'
import Videography from './pages/work/Videography.jsx'
import Photography from './pages/Photography.jsx'
import Vault from './pages/Vault.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/court-vision-3d" element={<CourtVision3D />} />
          <Route path="work/csis-portal" element={<CsisPortal />} />
          <Route path="work/laundry-xpress" element={<LaundryXpress />} />
          <Route path="work/tolet-globe" element={<ToLetGlobe />} />
          <Route path="work/design-qualities" element={<DesignQualities />} />
          <Route path="work/smart-shelf" element={<SmartShelf />} />
          <Route path="work/cinematic-automotive" element={<CinematicAutomotive />} />
          <Route path="work/king-run" element={<KingRun />} />
          <Route path="work/now-i-am-become-death" element={<NowIAmBecomeDeath />} />
          <Route path="work/detachable-kaleidoscope" element={<DetachableKaleidoscope />} />
          <Route path="work/algorithmic-soundscape" element={<AlgorithmicSoundscape />} />
          <Route path="work/videography" element={<Videography />} />
          <Route path="photography" element={<Photography />} />
          <Route path="vault" element={<Vault />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
