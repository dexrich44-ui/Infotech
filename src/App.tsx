import { useState, useMemo, useEffect } from 'react';
import { Routes, Route, Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  Terminal, 
  Cpu, 
  Globe, 
  Database,
  ArrowLeft,
  GraduationCap,
  RotateCcw,
  Trophy
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { courseData } from './data';
import { QuizQuestion, QuizResult } from './types';

const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1zCcVSxDThLsilzU_jIkEq-_LOGeeXjsv?usp=drive_link";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Quiz Component
const Quiz = ({ questions, onComplete }: { questions: QuizQuestion[], onComplete: (score: number) => void }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIdx];

  const handleNext = () => {
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore(s => s + 1);
    }

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
      setSelectedOption(null);
    } else {
      const finalScore = selectedOption === currentQuestion.correctAnswerIndex ? score + 1 : score;
      setIsFinished(true);
      onComplete(finalScore);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 text-center space-y-4"
      >
        <div className="inline-flex items-center justify-center p-4 bg-indigo-100 text-indigo-600 rounded-full mb-2">
          <Trophy className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Quiz Finalizado!</h3>
        <p className="text-slate-600 text-lg">
          Você acertou <span className="font-bold text-indigo-600">{score}</span> de <span className="font-bold">{questions.length}</span> questões.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <button 
            onClick={restartQuiz}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" /> Tentar Novamente
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Questão {currentQuestionIdx + 1} de {questions.length}</span>
        <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300" 
            style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 leading-tight">
        {currentQuestion.question}
      </h3>

      <div className="space-y-3">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOption(idx)}
            className={cn(
              "w-full text-left p-4 rounded-xl border-2 transition-all font-medium",
              selectedOption === idx 
                ? "border-indigo-600 bg-indigo-50 text-indigo-900" 
                : "border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs",
                selectedOption === idx ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300"
              )}>
                {String.fromCharCode(65 + idx)}
              </div>
              {option}
            </div>
          </button>
        ))}
      </div>

      <button
        disabled={selectedOption === null}
        onClick={handleNext}
        className={cn(
          "w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg shadow-indigo-200",
          selectedOption === null ? "bg-slate-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
        )}
      >
        {currentQuestionIdx === questions.length - 1 ? 'Finalizar Quiz' : 'Próxima Questão'}
      </button>
    </div>
  );
};

// Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="fixed top-0 w-full bg-white border-b border-slate-200 z-50 px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <Terminal className="w-6 h-6 text-indigo-600" />
          <span>InfoTech</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Cursos</Link>
          <a 
            href={DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Acessar Google Drive
          </a>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-white z-40 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-slate-100">Cursos</Link>
              <a href={DRIVE_FOLDER_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold mt-4 text-center">Google Drive</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center">
        <p className="text-sm text-slate-500">© 2026 InfoTech - Curso Técnico em Informática. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

// Home View
const Home = () => {
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('infotech_quiz_results');
    if (saved) setResults(JSON.parse(saved));
  }, []);

  const totalLessons = courseData.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessons = results.length;

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Evolua sua carreira com o <span className="text-indigo-600">Curso Técnico de Informática</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Acompanhe suas videoaulas presenciais e teste seus conhecimentos com nossos quizes práticos.
          </p>
        </div>
        
        <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-200 lg:w-72 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-indigo-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Progresso Geral</span>
            </div>
            <div className="text-3xl font-black mb-1">{Math.round((completedLessons / totalLessons) * 100)}%</div>
            <div className="text-sm text-indigo-100">{completedLessons} de {totalLessons} aulas concluídas</div>
          </div>
          <div className="mt-4 h-1.5 w-full bg-indigo-500 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${(completedLessons / totalLessons) * 100}%` }} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.modules.map((module, idx) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                {module.id === 'mod-hardware' && <Cpu className="w-6 h-6" />}
                {module.id === 'mod-networks' && <Globe className="w-6 h-6" />}
                {module.id === 'mod-programming' && <Terminal className="w-6 h-6" />}
                {module.id === 'mod-office' && <Database className="w-6 h-6" />}
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Módulo {idx + 1}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{module.title}</h3>
            <p className="text-sm text-slate-500 mb-6 flex-1">
              Acompanhe as aulas teóricas e realize as avaliações para validar seu aprendizado.
            </p>
            <Link 
              to={`/modulo/${module.id}`}
              className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all mt-auto"
            >
              Ver aulas <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Module Details View
const ModuleDetails = () => {
  const { moduleId } = useParams();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('infotech_quiz_results');
    if (saved) {
      const results: QuizResult[] = JSON.parse(saved);
      setCompletedLessons(results.map(r => r.lessonId));
    }
  }, []);

  const module = useMemo(() => courseData.modules.find(m => m.id === moduleId), [moduleId]);

  if (!module) return <Navigate to="/" />;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{module.title}</h1>
          <p className="text-slate-500">{module.lessons.length} videoaulas disponíveis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {module.lessons.map((lesson, idx) => {
          const isCompleted = completedLessons.includes(lesson.id);
          return (
            <Link
              key={lesson.id}
              to={`/aula/${lesson.id}`}
              className={cn(
                "flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-md transition-all group",
                isCompleted ? "border-green-100 bg-green-50/20" : ""
              )}
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-colors",
                  isCompleted 
                    ? "bg-green-100 text-green-600" 
                    : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                )}>
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : (idx + 1).toString().padStart(2, '0')}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{lesson.title}</h4>
                  <p className="text-sm text-slate-500 font-medium">{lesson.duration} • Videoaula</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isCompleted && (
                  <span className="text-xs font-bold text-green-600 uppercase tracking-widest bg-green-100 px-3 py-1 rounded-full">Aula Concluída</span>
                )}
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// Lesson View
const LessonView = () => {
  const { lessonId } = useParams();
  const [showQuiz, setShowQuiz] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('infotech_quiz_results');
    if (saved) {
      const results: QuizResult[] = JSON.parse(saved);
      if (results.some(r => r.lessonId === lessonId)) {
        setCompleted(true);
      }
    }
  }, [lessonId]);
  
  const lessonInfo = useMemo(() => {
    for (const mod of courseData.modules) {
      const lesson = mod.lessons.find(l => l.id === lessonId);
      if (lesson) return { lesson, module: mod };
    }
    return null;
  }, [lessonId]);

  if (!lessonInfo) return <Navigate to="/" />;

  const { lesson, module } = lessonInfo;

  const handleQuizComplete = (score: number) => {
    const newResult: QuizResult = {
      lessonId: lesson.id,
      score,
      total: lesson.quiz?.length || 0,
      completedAt: new Date().toISOString()
    };

    const saved = localStorage.getItem('infotech_quiz_results');
    let results: QuizResult[] = saved ? JSON.parse(saved) : [];
    
    // Replace if exists, else add
    const index = results.findIndex(r => r.lessonId === lesson.id);
    if (index > -1) {
      results[index] = newResult;
    } else {
      results.push(newResult);
    }

    localStorage.setItem('infotech_quiz_results', JSON.stringify(results));
    setCompleted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Video/Main Side */}
      <div className="lg:col-span-2 space-y-6">
        <Link 
          to={`/modulo/${module.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao módulo
        </Link>
        
        <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative group border-4 border-slate-900">
           <iframe
            src={lesson.videoUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900">{lesson.title}</h1>
              <p className="text-slate-500 font-medium">Videoaula • {module.title}</p>
            </div>
            {completed && (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-bold">
                <CheckCircle2 className="w-4 h-4" /> Concluída
              </div>
            )}
          </div>

          <p className="text-slate-600 leading-relaxed text-lg">
            {lesson.description}
          </p>
          
          <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-4">
            <a 
              href={DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-all"
            >
              <BookOpen className="w-4 h-4" /> Materiais no Drive
            </a>
            
            {lesson.quiz && lesson.quiz.length > 0 && !showQuiz && (
              <button 
                onClick={() => setShowQuiz(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                <Play className="w-4 h-4 fill-current" /> Fazer Quiz
              </button>
            )}
          </div>

          {/* Quiz Section */}
          <AnimatePresence>
            {showQuiz && lesson.quiz && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-50 -mx-8 px-8 py-10 border-y border-slate-200 mt-8"
              >
                <div className="max-w-xl mx-auto">
                  <Quiz 
                    questions={lesson.quiz} 
                    onComplete={handleQuizComplete} 
                  />
                  <button 
                    onClick={() => setShowQuiz(false)}
                    className="mt-8 text-sm text-slate-400 font-bold hover:text-slate-600 flex items-center gap-1 mx-auto"
                  >
                    <X className="w-4 h-4" /> Fechar Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar Playlist */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm sticky top-24">
          <div className="p-5 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Play className="w-4 h-4 text-indigo-600" /> Playlist do Módulo
            </h3>
          </div>
          <div className="max-h-[600px] overflow-y-auto divide-y divide-slate-100">
            {module.lessons.map((l, idx) => (
              <Link
                key={l.id}
                to={`/aula/${l.id}`}
                className={cn(
                  "flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors",
                  l.id === lessonId ? "bg-indigo-50/50 border-l-4 border-indigo-600" : ""
                )}
              >
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                  l.id === lessonId ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"
                )}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "text-sm font-bold truncate",
                    l.id === lessonId ? "text-indigo-900" : "text-slate-700"
                  )}>{l.title}</h4>
                  <span className="text-xs text-slate-500">{l.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modulo/:moduleId" element={<ModuleDetails />} />
        <Route path="/aula/:lessonId" element={<LessonView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}
