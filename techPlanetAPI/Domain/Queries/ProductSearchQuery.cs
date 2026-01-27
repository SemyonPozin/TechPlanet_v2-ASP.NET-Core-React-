using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Queries
{
    public class ProductSearchQuery
    {
        public string? Request { get; set; }
        public string? Category { get; set; }

        public string? Brand { get; set; }

        public decimal? MinPrice { get; set; }

        public decimal? MaxPrice { get; set; }

        public bool? IsNew { get; set; }
        public bool? WithDiscount { get; set; }
        public int? PageSize { get; set; }

        public int? PageNum { get; set; }
    }
}
