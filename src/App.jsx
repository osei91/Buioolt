import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import LockInCalculator from './components/LockInCalculator'
import CostTable from './components/CostTable'
import Pricing from './components/Pricing'
import MigrateForm from './components/MigrateForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-ink min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <LockInCalculator />
        <CostTable />
        <Pricing />
        <MigrateForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
