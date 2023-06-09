package nsu.theatre.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseTotalRevenueDTO {
    private String performanceTitle;
    private Date dateOfPerformance;
    private Long totalRevenue;
}
