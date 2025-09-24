import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Trophy, Target, Users, Settings, Play } from 'lucide-react';

const FantasyBasketballDashboard = () => {
  // Liga podatci - ovo bi trebalo doći iz tvog Python backend-a
  const [leagueTeams] = useState([
    { id: 1, name: "Moj Tim", owner: "Ja", players: [4563,3930,4152,4163,4244,4245,4246,4247,4390,4391,4469,4472,4487,4497,3704] },
    { id: 2, name: "Thunder Dunks", owner: "Marko", players: [5352,6022,6014,5765,6404,4612,5185,5012,5432,6044,5826,6512,6559,5464] },
    { id: 3, name: "Court Kings", owner: "Ana", players: [3704,4563,3930,4152,4163,4244,4245,4246,4247,4390] },
    { id: 4, name: "Slam Squad", owner: "Petar", players: [4391,4469,4472,4487,4497,5352,6022,6014,5765,6404] },
    { id: 5, name: "Hoop Dreams", owner: "Marija", players: [4612,5185,5012,5432,6044,5826,6512,6559,5464,3704] },
    { id: 6, name: "Net Ninjas", owner: "Ivan", players: [4563,3930,4152,4163,4244,4245,4246,4247,4390,4391] },
    { id: 7, name: "Dunk Dynasty", owner: "Luka", players: [4469,4472,4487,4497,5352,6022,6014,5765,6404,4612] },
    { id: 8, name: "Ball Handlers", owner: "Tea", players: [5185,5012,5432,6044,5826,6512,6559,5464,3704,4563] }
  ]);

  const [selectedMyTeam, setSelectedMyTeam] = useState(null);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Mock function - ovo bi trebalo pozivati tvoj Python backend
  const getTeamStats = (teamId) => {
    // Simulacija različitih statistika za različite timove
    const mockStats = {
      1: { '3PTM': 2.85, 'PTS': 22.4, 'REB': 8.2, 'AST': 5.8, 'ST': 1.2, 'BLK': 1.0, 'TO': 2.8, 'FG%': 0.478, 'FT%': 0.825 },
      2: { '3PTM': 2.2, 'PTS': 21.1, 'REB': 9.1, 'AST': 6.2, 'ST': 1.1, 'BLK': 0.8, 'TO': 3.2, 'FG%': 0.465, 'FT%': 0.798 },
      3: { '3PTM': 3.1, 'PTS': 24.2, 'REB': 7.8, 'AST': 5.5, 'ST': 1.3, 'BLK': 1.2, 'TO': 2.9, 'FG%': 0.485, 'FT%': 0.815 },
      4: { '3PTM': 2.5, 'PTS': 20.8, 'REB': 8.9, 'AST': 6.0, 'ST': 1.0, 'BLK': 0.9, 'TO': 3.1, 'FG%': 0.455, 'FT%': 0.785 },
      5: { '3PTM': 2.7, 'PTS': 21.8, 'REB': 8.5, 'AST': 5.9, 'ST': 1.15, 'BLK': 1.1, 'TO': 2.95, 'FG%': 0.472, 'FT%': 0.808 },
      6: { '3PTM': 2.3, 'PTS': 20.5, 'REB': 9.3, 'AST': 6.1, 'ST': 1.05, 'BLK': 0.85, 'TO': 3.0, 'FG%': 0.468, 'FT%': 0.792 },
      7: { '3PTM': 2.9, 'PTS': 23.1, 'REB': 7.9, 'AST': 5.7, 'ST': 1.25, 'BLK': 1.15, 'TO': 2.85, 'FG%': 0.481, 'FT%': 0.821 },
      8: { '3PTM': 2.4, 'PTS': 21.3, 'REB': 8.7, 'AST': 6.3, 'ST': 1.08, 'BLK': 0.92, 'TO': 3.15, 'FG%': 0.461, 'FT%': 0.789 }
    };
    return mockStats[teamId] || mockStats[1];
  };

  const handleAnalyze = () => {
    if (selectedMyTeam && selectedOpponent) {
      setShowAnalysis(true);
    }
  };

  const resetSelection = () => {
    setSelectedMyTeam(null);
    setSelectedOpponent(null);
    setShowAnalysis(false);
  };

  // Ako nisu odabrani timovi, prikaži team picker
  if (!showAnalysis) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
                Odaberi 2 ekipe za usporedbu
              </h1>
            </div>

            {/* Team Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Moj Tim */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
                  Ekipa A
                </h2>
                <div className="space-y-3">
                  {leagueTeams.map(team => (
                      <div
                          key={team.id}
                          onClick={() => setSelectedMyTeam(team)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                              selectedMyTeam?.id === team.id
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 hover:border-green-300'
                          }`}
                      >
                        <div className="font-semibold text-lg">{team.name}</div>
                        <div className="text-sm text-gray-600">Owner: {team.owner}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {team.players.length} igrača
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Protivnički Tim */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
                  Ekipa B
                </h2>
                <div className="space-y-3">
                  {leagueTeams
                      .filter(team => team.id !== selectedMyTeam?.id)
                      .map(team => (
                          <div
                              key={team.id}
                              onClick={() => setSelectedOpponent(team)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                  selectedOpponent?.id === team.id
                                      ? 'border-red-500 bg-red-50'
                                      : 'border-gray-200 hover:border-red-300'
                              }`}
                          >
                            <div className="font-semibold text-lg">{team.name}</div>
                            <div className="text-sm text-gray-600">Owner: {team.owner}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {team.players.length} igrača
                            </div>
                          </div>
                      ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 text-center space-y-4">
              {selectedMyTeam && selectedOpponent && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Odabrani Matchup:</h3>
                    <div className="flex items-center justify-center gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">{selectedMyTeam.name}</div>
                        <div className="text-sm text-gray-600">{selectedMyTeam.owner}</div>
                      </div>
                      <div className="text-3xl">vs</div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-red-600">{selectedOpponent.name}</div>
                        <div className="text-sm text-gray-600">{selectedOpponent.owner}</div>
                      </div>
                    </div>
                    <button
                        onClick={handleAnalyze}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                      <Play className="w-5 h-5" />
                      Analiziraj Matchup
                    </button>
                  </div>
              )}

              {(!selectedMyTeam || !selectedOpponent) && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                    <p className="text-yellow-800">
                      {!selectedMyTeam && !selectedOpponent
                          ? "Odaberi svoj tim i protivnika"
                          : !selectedMyTeam
                              ? "Odaberi svoj tim"
                              : "Odaberi protivnika"}
                    </p>
                  </div>
              )}
            </div>
          </div>
        </div>
    );
  }

  // Analiza - postojeći kod s podacima odabranih timova
  const statsData = {
    myTeam: getTeamStats(selectedMyTeam.id),
    opponent: getTeamStats(selectedOpponent.id)
  };

  // Postojeći kod za analizu...
  const getComparisonData = () => {
    const stats = Object.keys(statsData.myTeam);
    return stats.map(stat => {
      const myValue = statsData.myTeam[stat];
      const oppValue = statsData.opponent[stat];

      const isNegativeStat = stat === 'TO';
      const difference = isNegativeStat ? oppValue - myValue : myValue - oppValue;
      const percentageDiff = Math.abs(difference / oppValue * 100);

      let status = 'tie';
      let intensity = 'low';

      if (Math.abs(difference) > 0.01) {
        if (percentageDiff > 15) intensity = 'high';
        else if (percentageDiff > 7) intensity = 'medium';

        status = difference > 0 ? 'winning' : 'losing';
      }

      return {
        stat,
        myValue,
        oppValue,
        difference: difference,
        percentageDiff,
        status,
        intensity,
        displayStat: stat === 'FG%' || stat === 'FT%' ? (myValue * 100).toFixed(1) + '%' : myValue.toFixed(2)
      };
    });
  };

  const comparisonData = getComparisonData();

  const chartData = comparisonData.map(item => ({
    stat: item.stat,
    [selectedMyTeam.name]: item.stat.includes('%') ? item.myValue * 100 : item.myValue,
    [selectedOpponent.name]: item.stat.includes('%') ? item.oppValue * 100 : item.oppValue,
    difference: item.difference
  }));

  const getRadarData = () => {
    const maxValues = {
      '3PTM': 4, 'PTS': 30, 'REB': 12, 'AST': 10, 'ST': 2, 'BLK': 2, 'TO': 5, 'FG%': 0.6, 'FT%': 1
    };

    return comparisonData.map(item => ({
      stat: item.stat,
      [selectedMyTeam.name]: item.stat === 'TO' ?
          ((maxValues[item.stat] - item.myValue) / maxValues[item.stat]) * 100 :
          (item.myValue / maxValues[item.stat]) * 100,
      [selectedOpponent.name]: item.stat === 'TO' ?
          ((maxValues[item.stat] - item.oppValue) / maxValues[item.stat]) * 100 :
          (item.oppValue / maxValues[item.stat]) * 100
    }));
  };

  const radarData = getRadarData();

  const getStatusColor = (status, intensity) => {
    const colors = {
      winning: {
        low: 'bg-green-100 text-green-800 border-green-200',
        medium: 'bg-green-200 text-green-900 border-green-300',
        high: 'bg-green-300 text-green-900 border-green-400'
      },
      losing: {
        low: 'bg-red-100 text-red-800 border-red-200',
        medium: 'bg-red-200 text-red-900 border-red-300',
        high: 'bg-red-300 text-red-900 border-red-400'
      },
      tie: { low: 'bg-gray-100 text-gray-800 border-gray-200' }
    };
    return colors[status][intensity] || colors.tie.low;
  };

  const getStatusIcon = (status, intensity) => {
    if (status === 'winning') {
      return <TrendingUp className={`w-4 h-4 ${intensity === 'high' ? 'text-green-700' : 'text-green-600'}`} />;
    } else if (status === 'losing') {
      return <TrendingDown className={`w-4 h-4 ${intensity === 'high' ? 'text-red-700' : 'text-red-600'}`} />;
    }
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const winCount = comparisonData.filter(item => item.status === 'winning').length;
  const loseCount = comparisonData.filter(item => item.status === 'losing').length;
  const tieCount = comparisonData.filter(item => item.status === 'tie').length;

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header s odabranim timovima */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
              Fantasystična analiza
            </h1>
            <div className="flex items-center justify-center gap-4 mt-4">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
              {selectedMyTeam.name}
            </span>
              <span className="text-2xl">vs</span>
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold">
              {selectedOpponent.name}
            </span>
            </div>
            <button
                onClick={resetSelection}
                className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Promijeni timove
            </button>
          </div>

          {/* Rezultat kartica */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{winCount}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {selectedMyTeam.name} pobjeđuje
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{loseCount}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  {selectedOpponent.name} pobjeđuje
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600">{tieCount}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Minus className="w-4 h-4" />
                  Izjednačeno
                </div>
              </div>
            </div>
          </div>

          {/* Statistike grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {comparisonData.map((item) => (
                <div
                    key={item.stat}
                    className={`rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${getStatusColor(item.status, item.intensity)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{item.stat}</h3>
                    {getStatusIcon(item.status, item.intensity)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{selectedMyTeam.name}:</span>
                      <span className="font-bold text-lg">{item.displayStat}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{selectedOpponent.name}:</span>
                      <span className="font-bold text-lg">
                    {item.stat.includes('%') ? (item.oppValue * 100).toFixed(1) + '%' : item.oppValue.toFixed(2)}
                  </span>
                    </div>

                    {item.status !== 'tie' && (
                        <div className="pt-2 border-t border-current border-opacity-20">
                          <div className="text-xs font-medium">
                            {item.status === 'winning' ? '+' : ''}{item.difference.toFixed(2)}
                            <span className="ml-1">({item.percentageDiff.toFixed(1)}%)</span>
                          </div>
                        </div>
                    )}
                  </div>
                </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="text-blue-500" />
                Usporedba statistika
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stat" />
                  <YAxis />
                  <Tooltip
                      formatter={(value, name) => [
                        typeof value === 'number' ? value.toFixed(2) : value,
                        name
                      ]}
                  />
                  <Legend />
                  <Bar dataKey={selectedMyTeam.name} fill="#3B82F6" />
                  <Bar dataKey={selectedOpponent.name} fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Radar usporedba</h2>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="stat" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <Radar
                      name={selectedMyTeam.name}
                      dataKey={selectedMyTeam.name}
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                  />
                  <Radar
                      name={selectedOpponent.name}
                      dataKey={selectedOpponent.name}
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.3}
                      strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Legenda intenziteta:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-200 rounded"></div>
                <span className="text-sm">Mala prednost (do 7%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-200 border-2 border-green-300 rounded"></div>
                <span className="text-sm">Srednja prednost (7-15%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-300 border-2 border-green-400 rounded"></div>
                <span className="text-sm">Velika prednost (15%+)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FantasyBasketballDashboard;