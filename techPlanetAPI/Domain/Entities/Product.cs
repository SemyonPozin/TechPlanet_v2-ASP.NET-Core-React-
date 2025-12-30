namespace Domain.Entities
{
    public class Product {
      public int Id { get; set; }
      public string Name { get; set; }
      public string Brand { get; set; }
      public decimal Price { get; set; }
      public string Img { get; set; }
      public bool IsNew { get; set; }
      public float Discount { get; set; }
      public int CountToBuy { get; set; }
      public string Category { get; set; }
      public string Description { get; set; }

      public List<ProductCharacteristics> Charactertics { get; set; }
      public ICollection<Order> Orders { get; set; }
    }
}
