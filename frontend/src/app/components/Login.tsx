import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Building2, Mail, Lock, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface LoginProps {
  onLogin: (role: "user" | "officer" | "admin") => void;
  onBackToLanding: () => void;
  onGoToSignup: () => void;
}

export function Login({ onLogin, onBackToLanding, onGoToSignup }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "officer" | "admin">("user");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const msg = await response.text();
        alert(msg);
        return;
      }

      const user = await response.json();

      // 🔐 ROLE VALIDATION (KEY FIX)
      const backendRole = user.role.toLowerCase();

      if (backendRole !== role) {
        alert(
          `Role mismatch.\nYou selected "${role}", but your account is "${backendRole}".`
        );
        return;
      }

      // store user
      localStorage.setItem("user", JSON.stringify(user));

      // proceed only if role matches
      onLogin(backendRole);

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button onClick={onBackToLanding} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card className="p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">
              Login to access your welfare benefits
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 🔒 Role selector kept for UI, but NOT trusted */}
            <div>
              <Label htmlFor="role">Login As *</Label>
              <Select value={role} onValueChange={(value: any) => setRole(value)}>
                <SelectTrigger id="role" className="mt-2 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User (Citizen)</SelectItem>
                  <SelectItem value="officer">Officer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full bg-primary">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button
                onClick={onGoToSignup}
                variant="link"
                className="p-0 text-primary"
              >
                Sign Up
              </Button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
