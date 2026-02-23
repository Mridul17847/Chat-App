const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-300 via-base-200 to-base-300 p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="max-w-md text-center relative z-10">
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-3xl bg-gradient-to-br ${
                i % 3 === 0
                  ? "from-primary/30 to-primary/10"
                  : i % 3 === 1
                    ? "from-secondary/30 to-secondary/10"
                    : "from-accent/30 to-accent/10"
              } backdrop-blur-sm border border-base-content/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            />
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-lg text-base-content/70 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
