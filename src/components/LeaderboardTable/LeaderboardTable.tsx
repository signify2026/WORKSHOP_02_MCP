import React, { useMemo, useState, useCallback } from 'react';
import { DataTable, Avatar, Text, FlexRow, Button } from '@epam/uui';
import { DataColumnProps, useArrayDataSource } from '@epam/uui-core';
import { LeaderboardEntry } from '../../utils/dataUtils';
import css from './LeaderboardTable.module.scss';

export interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  className?: string;
  activeTabLabel?: string; // Label for the selected tab (e.g., "Class A", "Class B", etc.)
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  data,
  className,
  activeTabLabel
}) => {
  const [tableState, setTableState] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Page size options following Figma design
  const pageSizeOptions = [10, 25, 50, 100];

  // Calculate pagination values
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedData = data.slice(startIndex, endIndex);

  // Set up the data source for client-side data with pagination
  const dataSource = useArrayDataSource<LeaderboardEntry, string, unknown>({
    items: paginatedData,
    getId: (item) => item.id,
  }, [paginatedData]);

  const view = dataSource.useView(tableState, setTableState, {});

  // Handle page size change
  const handlePageSizeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Handle pagination navigation
  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  // Define the columns for the leaderboard table following Figma design
  const columns: DataColumnProps<LeaderboardEntry>[] = useMemo(() => [
    {
      key: 'rank',
      caption: 'Rank',
      render: (entry) => (
        <Text cx={css.rankText}>
          {entry.rank}
        </Text>
      ),
      width: 100,
      textAlign: 'center',
      isSortable: true,
    },
    {
      key: 'name',
      caption: 'Student Name',
      render: (entry) => (
        <FlexRow alignItems="center" spacing="12" cx={css.nameCell}>
          <Avatar
            size="24"
            img={entry.avatar || null}
            alt={entry.name}
          />
          <Text cx={css.nameText}>
            {entry.name}
          </Text>
        </FlexRow>
      ),
      width: 261,
      isSortable: true,
    },
    {
      key: 'class',
      caption: 'Class',
      render: (entry) => (
        <Text cx={css.classText}>
          {entry.className}
        </Text>
      ),
      width: 138,
      textAlign: 'center',
      isSortable: true,
    },
    {
      key: 'score',
      caption: 'Score',
      render: (entry) => (
        <Text cx={css.scoreText}>
          {entry.score}
        </Text>
      ),
      width: 120,
      textAlign: 'center',
      isSortable: true,
    },
    {
      key: 'percentage',
      caption: 'Percentage',
      render: (entry) => (
        <Text cx={css.percentageText}>
          {entry.scoreDisplay}
        </Text>
      ),
      width: 163,
      textAlign: 'center',
      isSortable: true,
    },
  ], []);

  if (data.length === 0) {
    return (
      <div className={`${css.emptyState} ${className || ''}`}>
        <Text>No students found for the selected filter.</Text>
      </div>
    );
  }

  return (
    <div className={`${css.leaderboardContainer} ${className || ''}`}>
      {/* Class Name Header with Divider - Shows selected tab label */}
      {activeTabLabel && (
        <div className={css.classHeaderContainer}>
          <div className={css.dividerLine}></div>
          <Text cx={css.classHeaderText}>
            {activeTabLabel}
          </Text>
        </div>
      )}
      
      <DataTable
        value={tableState}
        onValueChange={setTableState}
        getRows={view.getVisibleRows}
        columns={columns}
        headerTextCase="normal"
        cx={`${css.leaderboardTable} ${!activeTabLabel ? css.leaderboardTableStandalone : ''}`}
      />
      
      {/* Pagination Container - Following Figma Design */}
      <div className={css.paginationContainer}>
        <FlexRow justifyContent="space-between" alignItems="center" cx={css.paginationContent}>
          {/* Pagination Navigation Controls - Left Side */}
          <div className={css.paginationNavigation}>
            <Button 
              onClick={handlePrevPage}
              isDisabled={currentPage === 1}
              color="secondary"
              fill="outline"
              size="30"
              caption="Previous"
            />
            <Button 
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages}
              color="secondary"
              fill="outline"
              size="30"
              caption="Next"
            />
          </div>
          
          {/* Pagination Info and Controls - Right Side */}
          <div className={css.paginationRight}>
            <div className={css.paginationInfo}>
              <Text cx={css.paginationText}>
                {startIndex + 1}-{endIndex} of {totalItems}
              </Text>
            </div>
            
            <div className={css.pageSizeContainer}>
              <select 
                value={pageSize} 
                onChange={handlePageSizeChange}
                className={css.pageSizeSelect}
              >
                {pageSizeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </FlexRow>
      </div>
    </div>
  );
};
