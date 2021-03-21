using InterviewProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewProject.Interfaces
{
    public interface ILocationRepository
    {
        Task<IEnumerable<Location>> SearchByName(string name);
    }
}
