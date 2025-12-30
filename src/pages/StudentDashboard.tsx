import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  FileText,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  LogOut,
  User,
  BookOpen,
  BarChart3,
} from "lucide-react";

const StudentDashboard = () => {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || role !== "student")) {
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
    { label: "Exams Taken", value: "12", icon: FileText, color: "text-primary" },
    { label: "Average Score", value: "85%", icon: TrendingUp, color: "text-accent" },
    { label: "Pending Results", value: "2", icon: Clock, color: "text-orange-400" },
    { label: "Completed", value: "10", icon: CheckCircle, color: "text-green-500" },
  ];

  const recentExams = [
    { name: "Biology Midterm", score: "88%", date: "Dec 28, 2024", status: "graded" },
    { name: "Chemistry Quiz 3", score: "92%", date: "Dec 25, 2024", status: "graded" },
    { name: "Physics Final", score: "-", date: "Dec 30, 2024", status: "pending" },
    { name: "Math Assessment", score: "78%", date: "Dec 20, 2024", status: "graded" },
  ];

  return (
    <>
      <Helmet>
        <title>Student Dashboard | AI Exam Evaluator</title>
        <meta name="description" content="View your exam results, track progress, and manage your academic performance" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-foreground">Student Portal</h1>
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
            className="mb-8"
          >
            <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
              Welcome back, <span className="gradient-text">Student</span>
            </h2>
            <p className="text-muted-foreground">
              Track your exam performance and view your results here.
            </p>
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
            {/* Recent Exams */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 glass-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-serif font-semibold text-foreground">Recent Exams</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentExams.map((exam, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{exam.name}</p>
                        <p className="text-sm text-muted-foreground">{exam.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-lg font-bold ${
                        exam.status === "graded" ? "gradient-text-accent" : "text-muted-foreground"
                      }`}>
                        {exam.score}
                      </span>
                      {exam.status === "graded" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

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
                  <FileText className="w-4 h-4 mr-2" />
                  View All Exams
                </Button>
                <Button variant="glass" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance Analytics
                </Button>
                <Button variant="glass" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Performance Summary */}
              <div className="mt-8 p-4 rounded-xl bg-accent/10 border border-accent/30">
                <p className="text-sm text-muted-foreground mb-2">Overall Performance</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-accent to-cyan-400 rounded-full" />
                  </div>
                  <span className="text-sm font-bold text-accent">85%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  You're performing above average!
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;
