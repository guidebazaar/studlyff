
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Heart, Briefcase, CheckCircle2, Users, MapPin, School } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NetworkFiltersProps {
  onSearchChange: (search: string) => void;
  onInterestChange: (interest: string) => void;
  onSkillChange?: (skills: string[]) => void;
  onStatusChange?: (statuses: string[]) => void;
  onLocationChange?: (locations: string[]) => void;
  onSchoolChange?: (schools: string[]) => void;
  searchValue: string;
  selectedInterest: string;
  selectedSkills?: string[];
  selectedStatuses?: string[];
  selectedLocations?: string[];
  selectedSchools?: string[];
  onClearAll?: () => void;
}

const interests = [
  "Web Development",
  "AI/ML",
  "Startups",
  "Data Science",
  "Finance",
  "Photography",
  "Blockchain",
  "Entrepreneurship",
  "Gaming",
  "UX Design",
  "Marketing",
  "Travel",
  "Mobile Development",
  "IoT",
  "Music",
  "Content Writing",
  "Social Media",
  "Fitness"
];

const skills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "TypeScript",
  "Java",
  "C++",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "UI/UX Design",
  "Product Management",
  "Data Analysis",
  "Machine Learning",
  "Digital Marketing",
  "Content Creation",
  "Project Management",
  "Agile Methodology"
];

const statuses = [
  "Connected",
  "Pending",
  "Not Connected"
];

const locations = [
  "Remote",
  "New York",
  "San Francisco",
  "London",
  "Berlin",
  "Tokyo",
  "Sydney",
  "Toronto",
  "Singapore",
  "Bangalore"
];

const schools = [
  "Stanford University",
  "MIT",
  "Harvard University",
  "UC Berkeley",
  "University of Michigan",
  "NYU",
  "Columbia University",
  "University of Washington",
  "University of Texas",
  "Georgia Tech"
];

const filterGroups = [
  { label: 'Interests', items: interests, key: 'interests', icon: <Heart className="w-4 h-4 text-pink-400" /> },
  { label: 'Skills', items: skills, key: 'skills', icon: <Briefcase className="w-4 h-4 text-blue-400" /> },
  { label: 'Connection Status', items: statuses, key: 'statuses', icon: <CheckCircle2 className="w-4 h-4 text-green-400" /> },
  { label: 'Location', items: locations, key: 'locations', icon: <MapPin className="w-4 h-4 text-yellow-400" /> },
  { label: 'School', items: schools, key: 'schools', icon: <School className="w-4 h-4 text-purple-400" /> },
];

const NetworkFilters = ({
  onSearchChange,
  onInterestChange,
  onSkillChange = () => { },
  onStatusChange = () => { },
  onLocationChange = () => { },
  onSchoolChange = () => { },
  searchValue,
  selectedInterest,
  selectedSkills = [],
  selectedStatuses = [],
  selectedLocations = [],
  selectedSchools = [],
  onClearAll = () => { }
}: NetworkFiltersProps) => {
  const [open, setOpen] = useState({
    interests: true,
    skills: true,
    statuses: true,
    locations: false,
    schools: false,
  });

  const toggle = (key: string) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      onInterestChange(interest);
    } else {
      onInterestChange("All Interests");
    }
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    const updatedSkills = checked
      ? [...selectedSkills, skill]
      : selectedSkills.filter(s => s !== skill);
    onSkillChange(updatedSkills);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const updatedStatuses = checked
      ? [...selectedStatuses, status]
      : selectedStatuses.filter(s => s !== status);
    onStatusChange(updatedStatuses);
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const updatedLocations = checked
      ? [...selectedLocations, location]
      : selectedLocations.filter(l => l !== location);
    onLocationChange(updatedLocations);
  };

  const handleSchoolChange = (school: string, checked: boolean) => {
    const updatedSchools = checked
      ? [...selectedSchools, school]
      : selectedSchools.filter(s => s !== school);
    onSchoolChange(updatedSchools);
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 rounded-full px-4 py-2 border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>
      </div>

      {/* Filter Groups */}
      {filterGroups.map(group => (
        <div key={group.key} className="mb-4 transition-all">
          <button
            type="button"
            className="flex items-center justify-between w-full font-semibold mb-2 focus:outline-none text-white"
            onClick={() => toggle(group.key)}
          >
            <div className="flex items-center gap-2">
              {group.icon}
              <span>{group.label}</span>
            </div>
            <span className={`transform transition-transform ${open[group.key] ? 'rotate-90' : 'rotate-0'}`}>▶</span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${open[group.key] ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-2 pl-2">
              {group.key === 'interests' ? (
                <div className="flex flex-wrap gap-2 py-2">
                  {interests.map(interest => (
                    <Badge
                      key={interest}
                      className={`cursor-pointer ${selectedInterest === interest
                        ? 'bg-brand-purple/20 text-brand-purple border border-brand-purple/40'
                        : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'}`}
                      onClick={() => handleInterestChange(interest, selectedInterest !== interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              ) : (
                group.items.map(item => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={
                        group.key === 'skills' ? selectedSkills.includes(item) :
                          group.key === 'statuses' ? selectedStatuses.includes(item) :
                            group.key === 'locations' ? selectedLocations.includes(item) :
                              group.key === 'schools' ? selectedSchools.includes(item) : false
                      }
                      onChange={e => {
                        if (group.key === 'skills') handleSkillChange(item, e.target.checked);
                        else if (group.key === 'statuses') handleStatusChange(item, e.target.checked);
                        else if (group.key === 'locations') handleLocationChange(item, e.target.checked);
                        else if (group.key === 'schools') handleSchoolChange(item, e.target.checked);
                      }}
                      className="form-checkbox accent-purple-500 w-4 h-4 rounded-full transition"
                    />
                    <span className="text-white/90">{item}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Selected Filters */}
      {(selectedInterest !== "All Interests" || selectedSkills.length > 0 || selectedStatuses.length > 0 ||
        selectedLocations.length > 0 || selectedSchools.length > 0) && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Selected Filters:</span>
              <button
                className="text-xs text-brand-purple hover:underline"
                onClick={onClearAll}
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedInterest !== "All Interests" && (
                <Badge className="bg-brand-purple/20 text-brand-purple border border-brand-purple/40">
                  {selectedInterest}
                  <button
                    className="ml-1 hover:text-white"
                    onClick={() => onInterestChange("All Interests")}
                  >
                    ×
                  </button>
                </Badge>
              )}

              {selectedSkills.map(skill => (
                <Badge
                  key={skill}
                  className="bg-blue-500/20 text-blue-300 border border-blue-500/40"
                >
                  {skill}
                  <button
                    className="ml-1 hover:text-white"
                    onClick={() => handleSkillChange(skill, false)}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {selectedStatuses.map(status => (
                <Badge
                  key={status}
                  className="bg-green-500/20 text-green-300 border border-green-500/40"
                >
                  {status}
                  <button
                    className="ml-1 hover:text-white"
                    onClick={() => handleStatusChange(status, false)}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {selectedLocations.map(location => (
                <Badge
                  key={location}
                  className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                >
                  {location}
                  <button
                    className="ml-1 hover:text-white"
                    onClick={() => handleLocationChange(location, false)}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {selectedSchools.map(school => (
                <Badge
                  key={school}
                  className="bg-purple-500/20 text-purple-300 border border-purple-500/40"
                >
                  {school}
                  <button
                    className="ml-1 hover:text-white"
                    onClick={() => handleSchoolChange(school, false)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

      <button
        type="button"
        className="w-full rounded-full border border-purple-500 py-2 font-semibold text-purple-200 hover:bg-purple-500/20 transition shadow focus:outline-none focus:ring-2 focus:ring-purple-500 mt-6"
        onClick={onClearAll}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default NetworkFilters;
