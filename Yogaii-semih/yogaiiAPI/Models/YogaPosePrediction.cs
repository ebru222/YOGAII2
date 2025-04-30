using System.Collections.Generic;

namespace yogaiiAPI.Models
{
    public class YogaPosePrediction
    {
        public string Pose { get; set; }
        public double Confidence { get; set; }
        public Dictionary<string, double> AllProbabilities { get; set; }
    }
}