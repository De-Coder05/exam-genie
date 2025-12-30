import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import {
  BookOpen,
  Users,
  FileText,
  Clock,
  TrendingUp,
  Plus,
  LogOut,
  User,
  BarChart3,
  Settings,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ProfessorDashboard = () => {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || role !== "professor")) {
      navigate("/auth");
    }
  }, [user, role, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    { label: "Total Students", value: "156", icon: Users, color: "text-primary" },
    { label: "Active Exams", value: "8", icon: FileText, color: "text-accent" },
    { label: "Pending Reviews", value: "24", icon: Clock, color: "text-orange-400" },
    { label: "Avg Class Score", value: "82%", icon: TrendingUp, color: "text-green-500" },
  ];

  const recentSubmissions = [
    { student: "John Smith", exam: "Biology Midterm", score: "88%", status: "graded" },
    { student: "Sarah Johnson", exam: "Biology Midterm", score: "-", status: "pending" },
    { student: "Mike Wilson", exam: "Chemistry Quiz 3", score: "92%", status: "graded" },
    { student: "Emily Brown", exam: "Physics Final", score: "-", status: "pending" },
  ];

  const activeExams = [
    { name: "Biology Midterm", submissions: 45, total: 50, deadline: "Dec 31, 2024" },
    { name: "Chemistry Quiz 3", submissions: 38, total: 42, deadline: "Jan 2, 2025" },
    { name: "Physics Final", submissions: 12, total: 50, deadline: "Jan 5, 2025" },
  ];

  return (
    <>
      <Helmet>
        <title>Professor Dashboard | AI Exam Evaluator</title>
        <meta name="description" content="Manage exams, grade submissions, and track student performance with AI assistance" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-foreground">Professor Portal</h1>
                <p className="text-xs text-muted-foreground">AI Exam Evaluator</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                Welcome back, <span className="gradient-text-accent">Professor</span>
              </h2>
              <p className="text-muted-foreground">
                Manage your exams and review student submissions.
              </p>
            </div>
            <Button variant="hero" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Create New Exam
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Submissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 glass-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-serif font-semibold text-foreground">Recent Submissions</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentSubmissions.map((submission, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{submission.student}</p>
                        <p className="text-sm text-muted-foreground">{submission.exam}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-lg font-bold ${
                        submission.status === "graded" ? "gradient-text" : "text-muted-foreground"
                      }`}>
                        {submission.score}
                      </span>
                      {submission.status === "graded" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Button variant="glass" size="sm">
                          Grade
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-serif font-semibold text-foreground mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="glass" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Exam
                  </Button>
                  <Button variant="glass" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Students
                  </Button>
                  <Button variant="glass" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="glass" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </motion.div>

              {/* Active Exams */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-serif font-semibold text-foreground mb-4">Active Exams</h3>
                <div className="space-y-4">
                  {activeExams.map((exam, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{exam.name}</p>
                        <span className="text-xs text-muted-foreground">{exam.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
                            style={{ width: `${(exam.submissions / exam.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {exam.submissions}/{exam.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfessorDashboard;
